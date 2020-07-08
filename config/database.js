const {
  username,
  password,
  database,
  host,
} = require('./index').db;

const { sessionSecret } = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    sessionSecret,
    dialect: 'postgres',
  },
};
