const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviewsController')


router.post('/', reviewsController.create)
router.put('/', reviewsController.change)
router.get('/check/:Movie_id', reviewsController.getAll)
router.delete('/delete/:Review_id', reviewsController.del)
router.delete('/deleteAll/:Movie_id', reviewsController.delAll)

module.exports = router