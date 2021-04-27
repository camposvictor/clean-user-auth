import express from 'express'
import dotenv from 'dotenv'

import router from './routes'

dotenv.config()

const app = express()
app.use(router)

app.listen(3333, () => {
  console.log('Server running')
})
