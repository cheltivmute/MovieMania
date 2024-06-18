const {Countries, Movie} = require('../models/models')
const ApiError = require('../error/ApiError')

class CountriesController {
    async create(req, res, next) {
        const {Country_name} = req.body
        const checkCountry = await Countries.findOne({where: {Country_name}})
        if (checkCountry) {
            return next(ApiError.internal('Такая страна уже добавлена!'))
        }
        const country = await Countries.create({Country_name})
        return res.json(country)
    }

    async change(req, res, next) {
        const {Country_id, Country_name} = req.body
        const checkCountry = await Countries.findOne({where: {Country_name}})
        if (checkCountry) {
            return next(ApiError.internal('Такая страна уже добавлена!'))
        }
        const genre = await Countries.update({ Country_name }, { where: { Country_id } });
        return res.json(genre)
    }

    async deleteQ(req, res, next) {
        const {Country_id} = req.params
        const checkInCountry = await Movie.findOne({where: {Country_id}})
        if (checkInCountry) {
            return next(ApiError.internal('Некоторые фильмы содержат данную страну. Для удаления измените их!'))
        }
        const country = await Countries.destroy({ where: { Country_id } })
        return res.json(country)
    }

    async getAll(req, res) {
        const countries = await Countries.findAll({order: [['Country_name', 'ASC']]})
        return res.json(countries)
    }

}

module.exports = new CountriesController()