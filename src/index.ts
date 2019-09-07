import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const {PORT = 8000} = process.env

const app = express()

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

const names: string[] = []

app.get('/names', (req, res) => res.send({data: names}))

app.post('/names', (req, res) => {
  const {name} = req.body
  if (!name) return res.status(400).send({error: 'Field `name` is required'})

  names.push(name)
  res.send({success: true})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
