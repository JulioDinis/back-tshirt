
exports.up = function(knex) {
    return knex.schema.createTable('imagem_estampa', table => {
        table.string('caminho', 200).notNull()
        table.integer('estampaId').references('id')
          .inTable('estampa').notNull()
        table.primary(['caminho','estampaId'], 'imagem_estampa_pk')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('imagem_estampa')
};
