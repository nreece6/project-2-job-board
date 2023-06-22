# Job hive web application

Job hive is a job board application built for both employers and employees. Using multiple API's it has a fully fleshed out frontend with a landing page and a database set up to store all relevant data for loggin in users. It is a simplier looking site than others, since it was built for a more user friendly, ease of use site.

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Description: Retrieves a specific item from the API based on its ID.

- Package Information
- Package Name: project-2-job-board
- Version: 1.0.0
- Description: ""
- Main File: server.js
- License: ISC

## Scripts

| Script  | Description                                             |
| :------ | :------------------------------------------------------ |
| `test`  | Throws an error indicating no test is specified         |
| `start` | Starts the application by running server.js             |
| `seed`  | Runs the seed.js file to seed data into the application |

## Dependencies

| Dependency                | Version      |
| :------------------------ | :----------- |
| @google-cloud/local-auth  | ^2.1.0       |
| @google-cloud/storage     | ^6.11.0      |
| bcrypt                    | ^5.0.0       |
| connect-session-sequelize | ^7.0.4       |
| dotenv                    | ^8.2.0       |
| express                   | ^4.18.2      |
| express-handlebars        | ^5.2.0       |
| express-session           | ^1.17.1      |
| googleapis                | ^105.0.0     |
| multer                    | ^1.4.5-lts.1 |
| mysql2                    | ^2.2.5       |
| sequelize                 | ^6.3.5       |
| y                         | ^0.3.2       |

## Dev Dependencies

| Dev Dependencies       | Version |
| :--------------------- | :------ |
| eslint                 | ^7.12.1 |
| eslint-config-prettier | ^6.15.0 |
| prettier               | ^2.1.2  |

## Installation

Install my-project with npm

```bash
  npm install project-2-job-board
  cd project-2-job-board
```

## Tech Stack

**Client:**

- jQuery: A fast and feature-rich JavaScript library for simplifying DOM manipulation and event handling.
- jQuery UI: A library built on top of jQuery that provides a collection of user interface interactions, effects, widgets, and themes.
- Bootstrap: A popular CSS framework that provides a set of pre-styled components, grids, and CSS classes for building responsive and mobile-first web designs.

**Server:**

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A popular web application framework for Node.js.
- Sequelize: A promise-based ORM (Object-Relational Mapping) for interacting with relational databases.
- MySQL: A popular relational database management system.
- bcrypt: A library for password hashing and encryption.
- Multer: A middleware for handling multipart/form-data, commonly used for file uploads.
- Dotenv: A module for loading environment variables from a .env file.
- Google Cloud Storage: A service for storing and retrieving files in the cloud.
- Googleapis: A library for interacting with various Google APIs.
- Connect-session-sequelize: A middleware for managing sessions in Express.js using Sequelize for session storage.
- Express-handlebars: A templating engine for rendering views in Express.js.

## Usage/Examples

```javascript
const project2JobBoard = require("project-2-job-board");

function App() {
  return <Component />;
}
```

## Authors

- [@nreece6](https://github.com/nreece6)
- [@Ermi-B](https://github.com/Ermi-B)
- [@abrand93](https://github.com/abrand93)
- [@thepeabear](https://github.com/Thepeabear)

## Demo images

![Demo](https://media.giphy.com/media/4xs0Er3S9vnUXYdh5G/giphy.gif)
