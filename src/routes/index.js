const router = require("express").Router();

const User = require('./user.row.routes');

router.use('/user', User)

module.exports = router