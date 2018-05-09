require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEV,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: process.env.DB_DATABASE_TEST,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  travisTest: {
    username: 'postgres',
    password: '',
    database: 'weconnect_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
