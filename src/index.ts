import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const {PORT = 8000} = process.env

const app = express()

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
  res.send({status: 'OK'})
})

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
