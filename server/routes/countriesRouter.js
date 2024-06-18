const Router = require('express')
const router = new Router()
const countriesController = require('../controllers/countriesController')

router.post('/', countriesController.create)
router.put('/', countriesController.change)
router.get('/', countriesController.getAll)
router.delete('/delete/:Country_id', countriesController.deleteQ)

module.exports = router