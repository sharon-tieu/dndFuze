# DnDFuze

A PERN-stack application for Dungeons and Dragons game masters to manage their character stats.

## Why Build This?

I've always been interested in character creation and world-building so a friend of mine introduced me to Dungeons and Dragons. I was inspired by D&D Beyond and I wanted to make a simple character creation app for beginner game masters of Dungeons and Dragons to use for their campaigns!

## Technologies Used
- React
- Webpack
- TailwindCSS
- Node
- Express
- PostgreSQL
- HTML5
- CSS3
- AWS E2(w/dokku)

## Live Deployment
Check it out! --> https://dnd-fuze.sharonproject.com/

## Features
- User can create a character with name, species, class, starting weapon, and personality
- User can view characters
- User can edit character stats
- User can delete a character
- User can delete event
- User can secure user authentication using JsonWebToken and Argon2

## Future Features
- User can view their profile
- User can search other users
- User can create a campaign

## Preview 
! Kapture 2023-02-04 at 11.57.47.gif

## System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- MangoDB 4 or higher

## Getting Started
1. Clone the repository.

    ```shell
    git clone https://github.com/Learning-Fuze/sgt-react
    cd sgt-react
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to MongoDB.

    ```shell
    mongoimport --db sgt-react database/dump.json
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
