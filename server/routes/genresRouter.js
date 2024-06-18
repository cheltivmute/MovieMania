const Router = require('express')
const router = new Router()
const genresController = require('../controllers/genresController')


router.post('/', genresController.create)
router.delete('/delete/:Genre_id/:Genre_second_id', genresController.deleteQ)
router.put('/', genresController.change)
router.get('/', genresController.getAll)
router.get('/sec', genresController.getAllSec)
router.get('/:Genre_id', genresController.getOne)

module.exports = router