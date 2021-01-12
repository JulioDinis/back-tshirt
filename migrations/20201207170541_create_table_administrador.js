
exports.up = function (knex) {
    return knex.schema.createTable('administrador', (table) => {
        table.string('usuario', 15).primary()
        table.string('senha', 200).notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("administrador")
};
