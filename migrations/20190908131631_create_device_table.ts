import * as Knex from 'knex'

async function up(knex: Knex): Promise<any> {
  const exist = await knex.schema.hasTable('devices')
  if (exist) return

  await knex.schema.createTable('devices', t => {
    t.increments('id')
    t.string('name')
    t.string('state')
    t.string('type')
    t.string('location')
    t.string('color')
  })
}

async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('devices')
}

exports.up = up
exports.down = down
