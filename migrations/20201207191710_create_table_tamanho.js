
exports.up = function (knex) {
  return knex.schema.createTable("tamanho", (table) => {
    table.increments("id").primary()
    table.string("busto_torax", 10).notNull()
    table.string("cintura", 10).notNull()
    table.string("genero",10).notNull()
    table.string("sigla").notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("tamanho")
}
