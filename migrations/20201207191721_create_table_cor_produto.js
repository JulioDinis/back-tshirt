
exports.up = function (knex) {
  return knex.schema.createTable("produto_cor", (table) => {
    table.string("cor", 10).primary()
    table.integer("produtoId").references("id").inTable("produto").notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("produto_cor")
}
