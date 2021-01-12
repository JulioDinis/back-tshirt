
exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id').primary()
        table.string('bairro',20).notNull()
        table.string('cep',10).notNull()
        table.string('cidade',50).notNull()
        table.string('complemento',50).nullable()
        table.string('destinatario',50).notNull()
        table.string('estado',2).notNull()
        table.string('numero', 10).notNull()
        table.string('rua', 100).notNull()
        table.boolean('principal').notNull().defaultTo('true')
        table.integer('clienteId').references('id')
            .inTable('cliente').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('endereco')
};
