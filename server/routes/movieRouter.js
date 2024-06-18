const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/',  movieController.create)
router.get('/', movieController.getAll)
router.put('/change', movieController.change)
router.delete('/delete/:Movie_id', movieController.delete)
router.get('/id/:Movie_id', movieController.getOne)

module.exports = router