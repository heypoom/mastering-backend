require('ts-node/register')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3',
    },
  },
}
