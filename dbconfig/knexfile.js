require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'VirtualTimeCapsule2',
      user:     'petar',
      password: '123'
    },
    migrations: {
      directory: './migrations'
    }
  },
};
