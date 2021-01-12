
exports.up = function (knex) {
  return knex.schema.createTable("imagem_produto", (table) => {
    table.string("caminho", 200).notNull()
    table.integer("produtoId").references("id").inTable("produto").notNull()
    table.primary(["caminho", "produtoId"], "produto_estampa_pk")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("imagem_produto")
}
