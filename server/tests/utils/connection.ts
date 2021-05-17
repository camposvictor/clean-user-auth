import { createConnection, getConnection } from 'typeorm'

const connection = {
  async create() {
    await createConnection()

    const { app } = await import('../../src/main/app')
    return app
  },

  async close() {
    await getConnection().close()
  },
}

export { connection }
