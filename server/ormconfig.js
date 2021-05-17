module.exports = {
  name: 'default',
  logging: false,
  synchronize: false,
  type: 'sqlite',
  database:
    process.env.NODE_ENV === 'test'
      ? 'tests/database.sqlite'
      : 'src/infra/database/database.sqlite',
  entities: ['src/infra/database/entity/**/*.ts'],
  migrations: ['src/infra/database/migration/**/*.ts'],
  subscribers: ['src/infra/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/infra/database/entity',
    migrationsDir: 'src/infra/database/migration',
    subscribersDir: '/infra/database/subscriber',
  },
}
