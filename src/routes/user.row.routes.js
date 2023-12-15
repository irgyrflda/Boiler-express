const router = require("express").Router();
const { 
    GetAllRow,
    GetByIdRow,
    CreateRow,
    UpdateRow,
    DeleteByIdRow
} = require('../controller/user/index');

router.get('/', GetAllRow);
router.get('/:id_user', GetByIdRow);
router.post('/', CreateRow);
router.put('/:id_user', UpdateRow);
router.delete('/:id_user', DeleteByIdRow)

module.exports = router;