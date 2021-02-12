
exports.up = function(knex) {
  return knex.schema.createTable("pedido", (table) => {
    table.increments("id").primary()
    table.datetime("dataPedido").notNull().default("now()")
    table.string("cupom", 10)
    table.decimal("valor").notNull()
    table.decimal("frete").notNull()
    table.string("status", 15)
    table.integer("clienteId").references("id").inTable("cliente").notNull()
  })
};

exports.down = function(knex) {
   return knex.schema.dropTable("pedido")
};
