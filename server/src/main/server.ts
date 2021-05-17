import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection().then(async () => {
  const { app } = await import('./app')

  app.listen(3333, () => {
    console.log('Server running')
  })
})
