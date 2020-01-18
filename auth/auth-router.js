const bcrypt = require("bcryptjs")
const express = require("express")
const restricted = require("../middleware/restricted")
const usersModel = require("../users/users-model")

const router = express.Router()

router.post("/register", async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body)
    
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const invalidUser = { 
        message: "Invalid Username or Password"
    }
    const { username, password } = req.body
    const user = await usersModel.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)
    
    if (user && passwordValid) {
      req.session.user = user;

      res.status(200).json({
        message: `${user.username} successfully logged in!`,
      })
    } else {
      res.status(401).json(invalidUser)
    }
  } catch (err) {
    next(err)
  }
})

router.get("/protected", restricted(), async (req, res, next) => {
  try {
    console.log(req.headers)

    if(!req.session || !req.session.user) {
      return res.status(404).json({
        message: "Unauthorized, please log in."
      })
    }
  } catch(err) {
    next(err)
  }
})

router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      next(err)
    } else {
      res.json({
        message: "Successfully logged out!"
      })
    }
  })
})

module.exports = router;