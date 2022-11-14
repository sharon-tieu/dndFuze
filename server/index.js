require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.use(jsonMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  console.log('REQ.BODY:', req.body);
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "hashedPassword")
        VALUES ($1, $2)
        RETURNING "username", "username"
      `;
      const params = [username, hashedPassword];

      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "username",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { username, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

/* ⛔ Every route after this middleware requires a token! ⛔ */

// app.use(authorizationMiddleware);

app.post('/api/character-creation', (req, res, next) => {
  const { username } = req.user;
  const { question, answer } = req.body;
  if (!question || !answer) {
    throw new ClientError(400, 'question and answer are required fields');
  }
  const sql = `
    insert into "character-creation" ("username", "question", "answer")
    values ($1, $2, $3)
    returning *
  `;
  const params = [username, question, answer];
  db.query(sql, params)
    .then(result => {
      const [characterCreation] = result.rows;
      res.status(201).json(characterCreation);
    })
    .catch(err => next(err));
});

app.get('/api/character-creation', (req, res, next) => {
  const { username } = req.user;
  const sql = `
    select *
      from "character-creation"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
