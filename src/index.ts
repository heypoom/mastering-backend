import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const {PORT = 8000} = process.env

const app = express()

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

interface User {
  username: string
  email: string
}

const users: User[] = []

app.get('/users', (req, res) => res.send({data: users}))

app.post('/users', (req, res) => {
  const {username, email} = req.body

  if (!username || !email) {
    return res.status(400).send({error: 'Username and email is required'})
  }

  users.push({username, email})

  res.send({success: true})
})

app.get('/users/:username', (req, res) => {
  const {username} = req.params
  if (!username) return res.send({error: 'Username is not provided.'})

  const data = users.find(u => u.username === username)
  if (!data) return res.send({error: 'User not found.'})

  res.send({data})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
