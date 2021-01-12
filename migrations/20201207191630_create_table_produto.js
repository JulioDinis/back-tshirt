
exports.up = function (knex) {
  return knex.schema.createTable("produto", (table) => {
    table.increments("id").primary()
    table.datetime("data_cadastro").notNull().defaultTo('now()')
    table.string("descricao", 20).notNull()
    table.decimal("valor").notNull()
    table.string("genero", 10).notNull()
    table.boolean("disponivel", 15).notNull().defaultTo('true')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("produto")
}
