
exports.up = function(knex) {
  return knex.schema.createTable('income_tax', table => {
      table.increments('id').primary()
      table.integer('tributacaoId').notNull()
      table.double('aliquota').notNull()
      table.double('faixaInicial').notNull()
      table.double('faixaFinal').notNull()
      table.integer('tempoInicial').notNull()
      table.integer('tempoFinal').notNull()
      table.double('deducaoIRProgressivo').notNull()
      table.date('dataInicioVigencia').notNull()
      table.date('dataFinalVigencia')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('income_tax')
};
