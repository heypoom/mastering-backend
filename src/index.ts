import 'dotenv/config'

const {PORT = 8000} = process.env

app.listen(PORT, () => {
  console.log(`Server started at 0.0.0.0:${PORT}`)
})
