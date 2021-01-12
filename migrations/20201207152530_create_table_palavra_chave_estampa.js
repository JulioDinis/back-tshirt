
exports.up = function (knex) {
  return knex.schema.createTable("palava_chave_estampa", (table) => {
    table.string("palavraChave", 200).primary()
    table.integer("estampaId").references("id").inTable("estampa").notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("palava_chave_estampa")
}
