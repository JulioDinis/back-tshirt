
exports.up = function (knex) {
  return knex.schema.createTable("promocao_estampa", (table) => {
    table.integer("quantidade").notNull()
    table.integer("estampaId").references("id").inTable("estampa").notNull()
    table.integer("promocaoId").references("id").inTable("promocao").notNull()
    table.primary(["promocaoId", "estampaId"], "promocao_estampa_pk")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("promocao_estampa")
}
