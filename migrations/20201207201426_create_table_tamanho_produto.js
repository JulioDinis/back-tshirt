
exports.up = function (knex) {
  return knex.schema.createTable("tamanho_produto", (table) => {
    table.integer("tamanhoId").references("id").inTable('tamanho').notNull()
    table.integer("produtoId").references("id").inTable("produto").notNull()
    table.integer('quantidade').notNull().defaultTo('100')
    table.primary(['tamanhoId', 'produtoId'], 'tamanho_produto_pk')

  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("tamanho_produto")
}
