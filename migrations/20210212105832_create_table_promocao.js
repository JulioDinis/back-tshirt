
exports.up = function(knex) {
  return knex.schema.createTable("promocao", (table) => {
    table.increments("id").primary()
    table.datetime("dataCadastro").notNull().default("now()")
    table.datetime("validade").notNull().default("now()")
    table.string("cupom", 10).unique()
    table.decimal("desconto").notNull()
    table.string("descricao").notNull()
    table.string("mensagem", 200)
  })
};

exports.down = function(knex) {
   return knex.schema.dropTable("promocao")
};
