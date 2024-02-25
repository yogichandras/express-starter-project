# Express Starter API Project

This project was created to be a template when starting a new [express.js](https://github.com/expressjs/express) project.

## Features

1. ES6+ features with babel (including **es6 import/export** feature).
2. SQL database implementation with **[Sequelize v6](https://sequelize.org/docs/v6/)** for **postgres dialect** (you can change postgresql anytime).
3. Compatible with [12 factor app](https://12factor.net/).
4. Including authentication system with rest api endpoints.
5. Linting with eslint (airbnb config).
6. Implemented nodemailer. 
For more info, browse `src/helpers/mail.js` file.
7. Production ready Dockerfile.
8. Test cases written with mocha and chai.
9. Implemented [sentry](https://sentry.io) error tracking.
10. Api documentation with [swagger](https://swagger.io/).
11. Records are never deleted from the database. They are marked as deleted.
12. Cache management with [redis](https://redis.io/).

## Api Documentation
Api documentation of this project was created with [swagger](https://swagger.io/).
You can also discover the interactive documentation by going to `/docs` when you run the application.
Postman Collection to Swagger [converter](https://kevinswiber.github.io/postman2openapi/)

## Database Selection
This project is compatible with sql-based databases. You can change default dialect (postgres) in anytime.
To do this, firstly select your database from the table below.
Modify `dialect` property in `src/config/sequelize.js` and install required npm package(s) for this database.

For more info, visit [sequelize docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)

**Note:** The default and active database is postgresql.
If you want to use postgresql in your project, you don't need to make any changes.

| Database | Dialect | Required npm Package(s) |
| --- | --- | --- |
| MySQL | mysql | `yarn add mysql2` |
| MariaDB | mariadb | `yarn add mariadb` |
| PostgreSQL | postgres | `yarn add pg pg-hstore` |
| SQLite | sqlite | `yarn add sqlite3` |
| Microsoft SQL Server | mssql | `yarn add tedious` |

### Usage of sequelize-cli
With sequelize-cli package, you can manage model, migration and seed files.
You can find more information with [document](https://sequelize.org/docs/v6/other-topics/migrations/). 

## Installation
1. Firstly, you have to install npm packages with ``yarn install`` command.
2. Create empty postgres database.
3. Create **.env** file by copying *.env.sample* file in **root directory**.
4. Modify .env file.
5. Use `yarn run db:migrate` command to create database tables.
6. Finally, your app will run successfully with ``yarn run start:dev`` command.