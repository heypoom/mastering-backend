import * as Knex from 'knex'

async function up(knex: Knex) {
  const exists = await knex.schema.hasTable('devices')
  if (exists) return

  return knex.schema.createTable('devices', t => {
    t.increments('id')
    t.string('displayName').notNullable()
    t.string('color')
    t.string('type').notNullable()
    t.string('state').defaultTo('off')
  })
}

async function down(knex: Knex) {
  return knex.schema.dropTable('devices')
}

exports.up = up
exports.down = down
