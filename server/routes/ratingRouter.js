const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')


router.post('/', ratingController.create)
router.put('/', ratingController.change)
router.delete('/delete/:User_id/:Movie_id', ratingController.deleteRate)
router.delete('/delete/:Movie_id', ratingController.deleteAll)
router.get('/check/:User_id/:Movie_id', ratingController.check)
router.get('/avg/:Movie_id', ratingController.getAvgOne)
router.get('/check/:User_id', ratingController.getAll)

module.exports = router