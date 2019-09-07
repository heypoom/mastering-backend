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
  const {id, displayName, color, type} = req.body

  if (!id || !displayName || !color || !type) {
    return res
      .status(400)
      .send({error: 'Field `id, displayName, color, type` are required.'})
  }

  devices.push({id, displayName, color, type})

  res.send({success: true})
})

app.delete('/devices/:id', (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const device = devices.find(d => d.id === id)
  if (!device) return res.status(404).send({error: 'Device not found.'})

  devices = devices.filter(d => d.id !== id)

  res.send({success: true, data: device})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
