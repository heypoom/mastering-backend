import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const {PORT = 8000} = process.env

const app = express()

app.use(bodyParser())

interface Device {
  id: string
  displayName: string
  color: string
  type: string
  state: string
}

let devices: Device[] = []

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

app.get('/devices', (req, res) => res.send({data: devices}))

app.get('/devices/:id', (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const device = devices.find(d => d.id === id)
  if (!device) return res.status(404).send({error: 'Device not found.'})

  res.send({data: device})
})

app.post('/devices', (req, res) => {
  const {id, displayName, color, type, state} = req.body

  if (!id || !displayName || !color || !type || !state) {
    return res.status(400).send({
      error: 'Field `id, displayName, color, type, state` are required.',
    })
  }

  devices.push({id, displayName, color, type, state})

  res.send({success: true})
})

app.put('/devices/:id', (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const index = devices.findIndex(x => x.id === id)
  if (index < 0) return res.status(404).send({error: 'Device not found.'})

  const data = req.body as Device
  devices[index] = {...devices[index], ...data}

  res.send({success: true, data: devices[index]})
})

app.delete('/devices/:id', (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'}) const device = devices.find(d => d.id === id)
  if (!device) return res.status(404).send({error: 'Device not found.'})

  devices = devices.filter(d => d.id !== id)

  res.send({success: true, data: device})
})

app.post('/toggle/:id', (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const index = devices.findIndex(x => x.id === id)
  if (index < 0) return res.status(404).send({error: 'Device not found.'})

  const device = devices[index]
  const state = device.state === 'on' ? 'off' : 'on'

  devices[index] = {...devices[index], state}

  res.send({success: true, data: devices[index]})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
