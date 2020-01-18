const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const dbConfig = require("./db/dbConfig")
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/users-router.js")

const server = express()
const port = process.env.PORT || 5050

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    name: "def not a session",
    resave: false,
    saveUninitialized: false,
    secret: "I know what you did",
    cookie: {
        httpOnly: true,
        maxAge: 2629800000,
        secure: false,
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true,
    })
}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to the node-auth1-project API"
    })
})

server.use((err, req, res, next) => {
    console.log("Error:", err)

    res.status(500).json({
        message: "Oops! Go back to your code.",
    })
})

server.listen(port, () => {
    console.log(`\n ** Running on http://localhost:${port} **`)
})