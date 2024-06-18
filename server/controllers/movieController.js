const uuid = require('uuid')
const path = require('path')
const {Movie, Genres, Countries, SecondGenres, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize');

class MovieController {
    async create(req, res, next) {
        try {
            const {Title, Genre_id, Genre_second_id, Country_id, Duration, Budget, Description, Release_date} = req.body
            const {Cover} = req.files
            let fileName = uuid.v4() + ".jpg"
            Cover.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const movie = await Movie.create({Title, Cover: fileName, Genre_id, Genre_second_id, Country_id, Duration, Budget, Description, Release_date})
            return res.json(movie)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async change(req, res, next) {
        try {
            const { Movie_id, Title, Genre_id, Genre_second_id, Country_id, Duration, Budget, Description, Release_date } = req.body
            let movie
            let fileName = uuid.v4() + ".jpg"
    
            if (req.files) {
                const { Cover } = req.files
                Cover.mv(path.resolve(__dirname, '..', 'static', fileName))
                movie = await Movie.update(
                    { Title, Cover: fileName, Genre_id, Genre_second_id, Country_id, Duration, Budget, Description, Release_date },
                    { where: { Movie_id } }
                )
                return res.json(movie)
            } else {
                movie = await Movie.update(
                    { Title, Cover: fileName, Genre_id, Genre_second_id, Country_id, Duration, Budget, Description, Release_date },
                    { where: { Movie_id } }
                )
                return res.json(movie)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const {
          Title,
          Genre_id,
          Genre_second_id,
          Country_id,
          firstDuration,
          lastDuration,
          firstBudget,
          lastBudget,
          firstYear,
          lastYear,
          sortby,
          ascdesc,
        } = req.query;

        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 20;
        const offset = page * limit - limit;
      
        const where = {
          Duration: { [Op.between]: [+firstDuration, lastDuration] },
          Budget: { [Op.between]: [+firstBudget, lastBudget] },
          Release_date: {
            [Op.between]: [new Date(firstYear, 0, 1), new Date(lastYear, 11, 31)]
          }
        };
      
        if (Title) {
          where.Title = { [Op.iLike]: `%${Title}%` };
        }
        if (Genre_id) {
          where.Genre_id = Genre_id;
        }
        if (Genre_second_id) {
          where.Genre_second_id = Genre_second_id;
        }
        if (Country_id) {
          where.Country_id = Country_id;
        }
      
        const movies = await Movie.findAndCountAll({
          where,
          limit,
          offset,
          include: [Genres, SecondGenres, Countries],
          order: [[sortby || 'Title', ascdesc || 'ASC']]
        });
      
        return res.json(movies);
      }


    async getOne(req, res) {
        const {Movie_id} = req.params
        const movie = await Movie.findOne({
            where: {Movie_id}, 
            include: [Genres, SecondGenres, Countries]
        })
        return res.json(movie)
    }

    async delete(req, res) {
        const {Movie_id} = req.params
        const movie = await Movie.destroy({
            where: {Movie_id}
        })
        return res.json(movie)
    }

}

module.exports = new MovieController()