import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import Knex from 'knex'

const {PORT = 8000} = process.env

const app = express()

app.use(bodyParser())

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
  },
})

interface Device {
  id: string
  displayName: string
  color: string
  type: string
  state: string
}

class Devices {
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

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

app.get('/devices', async (req, res) => {
  const devices: Device[] = await Devices.findAll()

  res.send({data: devices})
})

app.get('/devices/:id', async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const device: Device = await Devices.get(id)

  res.send({data: device})
})

app.post('/devices', async (req, res) => {
  const {displayName, color, type, state} = req.body

  if (!displayName || !color || !type || !state) {
    return res.status(400).send({
      error: 'Field `id, displayName, color, type, state` are required.',
    })
  }

  const device = {displayName, color, type, state}

  const result = await Devices.create(device)

  res.send({success: true, result})
})

app.put('/devices/:id', async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const data = req.body as Device

  const result = await Devices.update(id, data)

  res.send({success: true, data, result})
})

app.delete('/devices/:id', async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  await Devices.delete(id)

  res.send({success: true})
})

app.post('/toggle/:id', async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const {state} = await Devices.get(id, 'state')
  const nextState = state === 'on' ? 'off' : 'on'

  await Devices.update(id, {state: nextState})

  res.send({success: true, state: nextState})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
