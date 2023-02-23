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
           "hashedPassword",
           "userId"
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
      console.log('USER:', user);
      const { hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId: user.userId };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

/* ⛔ Every route after this middleware requires a token! ⛔ */

app.use(authorizationMiddleware);

app.post('/api/character', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  console.log('USERID:', userId);
  const {
    characterName,
    characterRace,
    characterClass,
    characterStartingWeapon,
    characterPersonality
  } = req.body;
  if (!characterName) {
    throw new ClientError(400, 'Missing Character Name');
  }
  if (!characterRace) {
    throw new ClientError(400, 'Missing Character Race');
  }
  if (!characterClass) {
    throw new ClientError(400, 'Missing Character Class');
  }
  if (!characterStartingWeapon) {
    throw new ClientError(400, 'Missing Character Starting Weapon');
  }
  if (!characterPersonality) {
    throw new ClientError(400, 'Missing Character Personality');
  }
  let wisdom;
  let strength;
  let speed;
  let charisma;
  if (characterClass === 'warrior') {
    wisdom = 3;
    strength = 5;
    speed = 2;
    charisma = 2;
  } else if (characterClass === 'cleric') {
    wisdom = 4;
    strength = 2;
    speed = 3;
    charisma = 3;
  } else if (characterClass === 'assassin') {
    wisdom = 3;
    strength = 3;
    speed = 5;
    charisma = 4;
  }
  const sql = `
    insert into "charactersCreated" ("userId", "characterName", "characterRace", "characterClass", "characterStartingWeapon", "characterPersonality", "level", "wisdom", "strength", "speed", "charisma")
    values ($1, $2, $3, $4, $5, $6, 1, $7, $8, $9, $10)
    returning *
  `;
  const params = [userId, characterName, characterRace, characterClass, characterStartingWeapon, characterPersonality, wisdom, strength, speed, charisma];
  db.query(sql, params)
    .then(result => {
      const [newCharacter] = result.rows;
      res.status(201).json(newCharacter);
    })
    .catch(err => next(err));
});

app.get('/api/character', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const sql = `
      select *
        from "charactersCreated"
       where "userId" = $1
    `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));

});

app.get('/api/character/details', authorizationMiddleware, (req, res, next) => {
  const { characterId } = req.query;
  const sql = `
    select *
      from "charactersCreated"
      where "characterId" = $1
    `;
  const params = [characterId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/character/:characterId', authorizationMiddleware, (req, res, next) => {
  const { characterId } = req.params;
  console.log('REQ.BODY:', req.body);
  const {
    wisdom,
    strength,
    speed,
    charisma
  } = req.body;

  const updateSql = `
    UPDATE "charactersCreated"
    SET "wisdom"= $1,
        "strength"= $2,
        "speed"= $3,
        "charisma"= $4
    WHERE "characterId" = $5
    RETURNING *
  `;
  const params = [wisdom, strength, speed, charisma, Number(characterId)];
  console.log('PARAMS:', params);
  db.query(updateSql, params)
    .then(result => {
      const [statsUpdate] = result.rows;
      console.log('statsUpdate:', statsUpdate);
      res.status(201).json(statsUpdate);
    })
    .catch(err => next(err));
});

app.delete('/api/character/:characterId', authorizationMiddleware, (req, res, next) => {
  const { characterId } = req.params;
  const deleteCharacter = `
    DELETE
      FROM "charactersCreated"
      WHERE "characterId" = $1
  `;
  db.query(deleteCharacter, [characterId])
    .then(result => {
      res.status(201).json({ success: true });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
