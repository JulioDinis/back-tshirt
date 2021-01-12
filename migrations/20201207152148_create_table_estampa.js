
exports.up = function(knex) {
    return knex.schema.createTable('estampa', table => {
        table.increments('id').primary()
        table.datetime('dataLancamento').notNull()
        table.string('descricao', 100).notNull()
        table.decimal('valor').notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("estampa")
};
