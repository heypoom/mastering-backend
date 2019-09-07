import {knex} from '..'

import {Device} from './type'

export class Devices {
  static findAll() {
    return knex.select('*').from('devices')
  }

  static get(id: string, fields: string = '*') {
    return knex
      .select(fields)
      .from('devices')
      .where('id', id)
      .first()
  }

  static update(id: string, data: Partial<Device>) {
    return knex('devices')
      .where('id', id)
      .update(data)
  }

  static delete(id: string) {
    return knex('devices')
      .where('id', id)
      .delete()
  }

  static create(data: Partial<Device>) {
    return knex.insert(data).into('devices')
  }
}
