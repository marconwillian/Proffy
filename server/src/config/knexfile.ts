import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.resolve(__dirname, '..', '..', '.env')});

module.exports = {
  development: {
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'database', 'test.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    useNullAsDefault: false
  },
  production: {
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  }
};