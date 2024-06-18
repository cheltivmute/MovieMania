const {Genres, SecondGenres, Movie} = require('../models/models')
const ApiError = require('../error/ApiError')

class GenresController {
    async create(req, res, next) {
        const {Genre_name} = req.body
        const checkGenre = await Genres.findOne({where: {Genre_name}})
        if (checkGenre) {
            return next(ApiError.internal('Такой жанр уже добавлен!'))
        }
        const genre = await Genres.create({Genre_name})
        await SecondGenres.create({Genre_name})
        return res.json(genre)
    }

    async deleteQ(req, res, next) {
        const {Genre_id, Genre_second_id} = req.params

        const checkInGenre = await Movie.findOne({where: {Genre_id}})
        if (checkInGenre) {
            return next(ApiError.internal('Некоторые фильмы содержат данный жанр. Для удаления измените их!'))
        }
        const genre = await Genres.destroy({ where: { Genre_id } })
        await SecondGenres.destroy({ where: { Genre_second_id} })
        return res.json(genre)
    }

    async change(req, res, next) {
        const {Genre_id, Genre_second_id, Genre_name} = req.body
        const checkGenre = await Genres.findOne({where: {Genre_name}})
        if (checkGenre) {
            return next(ApiError.internal('Такой жанр уже добавлен!'))
        }
        const genre = await Genres.update({ Genre_name }, { where: { Genre_id } });
        await SecondGenres.update({ Genre_name }, { where: { Genre_second_id } });
        return res.json(genre)
    }

    async getAll(req, res) {
        const genres = await Genres.findAll({order: [['Genre_name', 'ASC']]})
        return res.json(genres)
    }

    async getAllSec(req, res) {
        const genres = await SecondGenres.findAll({order: [['Genre_name', 'ASC']]})
        return res.json(genres)
    }

    async getOne(req, res) {
        const {Genre_id} = req.params
        const genre = await Genres.findOne({where: {Genre_id}})
        return res.json(genre)
    }

}

module.exports = new GenresController()