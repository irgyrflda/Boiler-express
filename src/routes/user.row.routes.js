const router = require("express").Router();
const { 
    GetAllRow,
    GetByIdRow,
    CreateRow,
    UpdateRow,
    DeleteByIdRow
} = require('../controller/user/index'); //import index controller

router.get('/', GetAllRow); //url endpoint get all
router.get('/:id_user', GetByIdRow); //url endpoint get by id dengan params id_user (METHOD GET)
router.post('/', CreateRow); //url endpoint create (METHOD POST)
router.put('/:id_user', UpdateRow); //url endpoint update dengan params id_user (METHOD PUT)
router.delete('/:id_user', DeleteByIdRow) //url endpoint delete dengan params id_user (METHOD DELETE)

module.exports = router; //exports module router
//module ini di import di .src/routes/index.js