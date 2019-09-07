import 'dotenv/config'

import feathers from '@feathersjs/feathers'
import '@feathersjs/transport-commons'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

import Knex from 'knex'

import {DeviceService} from './Devices'
import {toggleDeviceHandler} from './Devices/toggle'

const {PORT = 8000} = process.env

const app = express(feathers())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))

app.configure(express.rest())
app.configure(socketio())

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
  },
})

app.get('/', (req, res) => {
  res.send({status: 'OK'})
})

app.use('devices', new DeviceService())
app.post('/toggle/:id', toggleDeviceHandler)

app.use(express.errorHandler())

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
