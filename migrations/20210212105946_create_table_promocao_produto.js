
exports.up = function (knex) {
  return knex.schema.createTable("promocao_produto", (table) => {
    table.integer("quantidade").notNull()
    table.integer("produtoId").references("id").inTable("produto").notNull()
    table.integer("promocaoId").references("id").inTable("promocao").notNull()
    table.primary(["promocaoId", "produtoId"], "promocao_produto_pk")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("promocao_produto")
}
