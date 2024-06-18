const { Review, User, Rating } = require("../models/models")
const ApiError = require('../error/ApiError')

class ReviewsController {
    async create(req, res, next) {
        try {
            const {User_id, Movie_id, Content} = req.body
    
            const review = await Review.create({User_id, Movie_id, Content})
            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async change(req, res, next) {
        try {
            const {Review_id, Content} = req.body

            const review = await Review.update({ Content }, { where: { Review_id } },);

            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res, next) {
        try {
            const {Movie_id} = req.params
            const review = await Review.findAll({
                where: {Movie_id}, 
                include: [User],
                order: [['createdAt', 'DESC']]
            })

            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async del(req, res, next) {
        try {
            const {Review_id} = req.params
            const review = await Review.destroy({ where: { Review_id } })
            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async delAll(req, res, next) {
        try {
            const {Movie_id} = req.params
            const review = await Review.destroy({ where: { Movie_id } })
            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

}

module.exports = new ReviewsController()