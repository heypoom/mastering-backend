import 'dotenv/config'

import Knex from 'knex'

const {PORT = 8000} = process.env

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
