const bcrypt = require("bcryptjs")
const db = require("../db/dbConfig")

function find() {
    return db("users")
        .select("id", "username")
} 

function findBy(data) {
    return db("users")
      .where(data)
      .select("id", "username", "password")
}

function findById(id) {
    return db("users")
        .where({ id })
        .first("id", "username")
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 16)
    const [id] = await db("users")
        .insert(user)

    return findById(id)
}


module.exports = {
    find,
    findBy,
    findById,
    add
}