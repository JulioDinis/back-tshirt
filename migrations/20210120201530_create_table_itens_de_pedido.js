
exports.up = function(knex) {
   return knex.schema.createTable("itens_pedido", (table) => {
     table.integer("estampaId").references("id").inTable("estampa").notNull()
     table.integer("pedidoId").references("id").inTable("pedido").notNull()
     table.integer("produtoId").references("id").inTable("produto").notNull()
     table.integer("quantidade").notNull().default("1")
     table.primary(["pedidoId", "estampaId", "produtoId"], "itens_pedido_pk")
   })
};

exports.down = function(knex) {
    return knex.schema.dropTable("itens_pedido")
};
