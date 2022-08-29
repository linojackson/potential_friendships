# potencial_friendships

[![Build Status](https://travis-ci.org/hagopj13/node-express-boilerplate.svg?branch=master)](https://travis-ci.org/hagopj13/node-express-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/hagopj13/node-express-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/hagopj13/node-express-boilerplate?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Potential Friends is intended to refer the user to potential friends they may have based on their social circle.

The project is a REST API with all the necessary routes, storing its data in memory, exempting the use of a database.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/linojackson/potencial_friendships
cd potencial_friendships
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Linting](#linting)

## Features

- **Routes**: routes created using [express](https://expressjs.com/)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Docker support**
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Compile**: with [Babel](https://babeljs.io)

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
# build first
yarn build

# execute
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000
```

## Project Structure

```
src\
 |--@types\         # Custom types to variables
 |--controllers\    # Route controllers (controller layer)
 |--models\         # Interfaces (data layer)
 |--tests\          # Integration tests
 |--app.js          # Express app
 |--routes.ts       # Routes
 |--server.ts       # Server start
```

## API Endpoints

List of available routes:

**User routes**:\
`POST /person` - create a user\
`GET /person/:cpf` - get user\

**Relationships routes**:\
`POST /relationship` - create a relationship between two users\
`GET /recommendations/:cpf` - recommends potencial friends\

**Seeds routes**:\
`POST /seeds/users` - seeds DB with some users\
`POST /seeds/relationships` - seeds DB with some relationships\

**Clean routes**:\
`DELETE /clean` - clean all data

## Linting

Linting is done using [ESLint](https://eslint.org/).

To modify the ESLint configuration, update the `.eslintrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore`.

## License

[MIT](LICENSE)
