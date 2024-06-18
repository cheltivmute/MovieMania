const Router = require('express')
const router = new Router()
const accountController = require('../controllers/accountController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', accountController.getAll)
router.get('/:User_id', accountController.getOne)
router.put('/change/', accountController.change)
router.put('/change/isblock/', accountController.changeIsBlocked)
router.put('/change/role/', accountController.changeRole)


module.exports = router