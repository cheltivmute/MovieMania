const { Rating, Movie, Genres, Countries, SecondGenres } = require("../models/models")
const ApiError = require('../error/ApiError')

class RatingController {
    async create(req, res, next) {
        try {
            const {User_id, Movie_id, Rating_value} = req.body
    
            const rating = await Rating.create({User_id, Movie_id, Rating_value})
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async change(req, res, next) {
        try {
            const {User_id, Movie_id, Rating_value} = req.body

            const rating = await Rating.update({ Rating_value }, { where: { User_id, Movie_id } },);

            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async check(req, res) {
        const {User_id, Movie_id} = req.params
        
        const rating = await Rating.findOne({
            where: {User_id, Movie_id}
        })
        return res.json(rating)
    }

    async getAll(req, res) {
        const {User_id} = req.params
        
        const rating = await Rating.findAndCountAll({
            where: { User_id },
            include: [
                {
                    model: Movie,
                    include: [Genres, SecondGenres, Countries]
                }
            ],
            order: [['createdAt', 'Desc']]
        })
        return res.json(rating)
    }

    async deleteRate(req, res) {
        const {User_id, Movie_id} = req.params
        
        const rating = await Rating.destroy({
            where: {User_id, Movie_id}
        })
        return res.json(rating)
    }

    async deleteAll(req, res) {
        const {Movie_id} = req.params
        
        const rating = await Rating.destroy({
            where: {Movie_id}
        })
        return res.json(rating)
    }


    async getAvgOne(req, res) {
        const { Movie_id } = req.params;
      
        const resultCount = await Rating.aggregate('Rating_value', 'count', { where: { Movie_id } });
        const resultSum = await Rating.aggregate('Rating_value', 'sum', { where: { Movie_id } });

        const result = resultSum / resultCount
      
        const averageRating = result ? result.toFixed(2) : ':(';
      
        return res.json({ averageRating });
      }


}

module.exports = new RatingController()