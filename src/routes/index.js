//INDEX ROUTES
const router = require("express").Router();

const User = require('./user.row.routes'); //import routes user

router.use('/user', User) //url user

module.exports = router //exports router
//module ini di import di index.js depan