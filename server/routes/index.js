const Router = require('express')
const router = new Router()

const movieRouter = require('./movieRouter')
const userRouter = require('./userRouter')
const folderRouter = require('./folderRouter')
const genresRouter = require('./genresRouter')
const countriesRouter = require('./countriesRouter')
const reviewsRouter = require('./reviewsRouter')
const ratingRouter = require('./ratingRouter')
const accountRouter = require('./accountRouter')

router.use('/user', userRouter)
router.use('/review', reviewsRouter)
router.use('/genre', genresRouter)
router.use('/country', countriesRouter)
router.use('/movie', movieRouter)
router.use('/rating', ratingRouter)
router.use('/folder', folderRouter)
router.use('/account', accountRouter)

module.exports = router