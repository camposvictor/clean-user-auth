import express from 'express'
import router from './routes'

const app = express()
app.use(express.json())
app.use(router)

const server = app.listen(3333, () => {
  console.log('Server running')
})

export { server }
