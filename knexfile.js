// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'tshirt',
      user:     'postgres',
      password: 'Abacate!@#'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
	}
};
