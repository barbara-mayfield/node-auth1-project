
exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
      table.increments()
      table.string("username", 100).notNullable().unique()
      table.string("password", 100).notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
