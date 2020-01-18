exports.seed = async function(knex) {
  await knex("users").insert([
    { id: 1, username: "barbaram", password: "potato" },
    { id: 2, username: "coltr", password: "tomato" }
  ])
}