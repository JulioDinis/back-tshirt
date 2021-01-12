
exports.up = function(knex) {
	return knex.schema.createTable('cliente', table => {
		table.increments('id').primary()
		table.string('nome', 20).notNull()
		table.string('sobrenome', 20).notNull()
		table.string('telefone', 15).notNull()
		table.string('cpf', 15).notNull()
		table.string('email', 50).notNull().unique()
		table.string('senha',100).notNull()
		table.string('sexo',10).notNull()
		table.string('status', 20).notNull().defaultTo('ativo')
		table.datetime("data_cadastro").notNull().defaultTo('now()')
		table.datetime("data_nascimento").notNull()
 })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cliente')
};
