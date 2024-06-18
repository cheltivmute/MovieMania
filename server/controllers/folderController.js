const uuid = require('uuid')
const path = require('path')
const {Folder, FolderMovie, Movie} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize');

class FolderController {
    async create(req, res, next) {
        const {User_id, Folder_name, Description} = req.body
        const checkFolder = await Folder.findOne({where: {User_id, Folder_name}})
        if (checkFolder) {
            return next(ApiError.internal('Такая папка уже существует!'))
        }
        const {Cover} = req.files
        let fileName = uuid.v4() + ".jpg"
        Cover.mv(path.resolve(__dirname, '..', 'static', fileName))
    
        const folder = await Folder.create({User_id, Folder_name, Cover: fileName, Description})
        return res.json(folder)
    }

    async getAll(req, res) {
        const {User_id} = req.params

        let folders = await Folder.findAndCountAll({where: {User_id}, order: [['createdAt', 'ASC']]}) 

        return res.json(folders)
    }

    async change(req, res, next) {
        const {User_id, Folder_id, Folder_name, Description} = req.body
        const checkFolder = await Folder.findOne({where: {User_id, Folder_name}})
        if (checkFolder && (checkFolder.Folder_id !== Folder_id)) {
            return next(ApiError.internal('Такая папка уже существует!'))
        }
        let folder
        let fileName = uuid.v4() + ".jpg"  
        if(req.files) {
            const {Cover} = req.files                                              
            Cover.mv(path.resolve(__dirname, '..', 'static', fileName))    
            folder = await Folder.update({ Folder_name, Cover: fileName, Description }, { where: { Folder_id } })
            return res.json(folder)
        } else {
            folder = await Folder.update({ Folder_name, Description }, { where: { Folder_id } })
            return res.json(folder)
        }            

    }

    async del(req, res, next) {
        try {
            const {Folder_id} = req.params
            await FolderMovie.destroy({where: {Folder_id}})
            const folder = await Folder.destroy({ where: { Folder_id } })            
            return res.json(folder)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getOne(req, res, next) {
        const {User_id, Folder_name} = req.params

        let folders = await Folder.findOne({where: {User_id, Folder_name}}) 

        return res.json(folders)
    }

    async getOneId(req, res, next) {
        const {Folder_id} = req.params

        let folders = await Folder.findOne({where: {Folder_id}}) 

        return res.json(folders)
    }

    async addMovieToFolder(req, res, next) {
        const {Folder_id, Movie_id} = req.params
        const checkFolder = await FolderMovie.findOne({where: {Folder_id, Movie_id}})
        if (checkFolder) {
            return next(ApiError.internal('Фильм уже добавлен в эту папку!'))
        }
        const folderMovie = await FolderMovie.create({Movie_id, Folder_id })
        return res.json(folderMovie)

    }

    async fetchMovieToFolder(req, res, next) {
        const {Folder_id} = req.params
        const folderMovie = await FolderMovie.findAndCountAll({where: {Folder_id}, include: [Movie], order: [[ 'createdAt', 'ASC']]})    
        return res.json(folderMovie)
    }

    async fetchFolderToMovie(req, res, next) {
        try {
            const {Movie_id} = req.params
            const folderMovie = await FolderMovie.findAll({where: {Movie_id}, include: [Movie]})    
            return res.json(folderMovie)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async fetchOneMovieToFolder(req, res, next) {
        try {
            const {Folder_id, Movie_id} = req.params
            const folderMovie = await FolderMovie.findAndCountAll({where: {Folder_id, Movie_id}})    
            return res.json(folderMovie)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOneMovieToFolder(req, res, next) {
        const {Folder_id, Movie_id} = req.params
        const checkFolder = await FolderMovie.findOne({where: {Folder_id, Movie_id}})
        if (!checkFolder) {
            return next(ApiError.internal('Фильм не добавлен в эту папку!'))
        }
        const folderMovie = await FolderMovie.destroy({where: {Folder_id, Movie_id}})    
         return res.json(folderMovie)

    }

    async deleteAllMovieToFolder(req, res, next) {
        const {Movie_id} = req.params
        const checkFolder = await FolderMovie.findOne({where: {Movie_id}})
        if (checkFolder) {
            return next(ApiError.internal('В папках нет такого фильма!'))
        }
        const folderMovie = await FolderMovie.destroy({where: {Movie_id}})    
        return res.json(folderMovie)
    }

    async deleteAllFolderToMovie(req, res, next) {
        const {Folder_id} = req.params
        const checkFolder = await FolderMovie.findOne({where: {Folder_id}})
        if (checkFolder) {
            return next(ApiError.internal('В папке не содержится фильмов!'))
        }
        const folderMovie = await FolderMovie.destroy({where: {Folder_id}})    
        return res.json(folderMovie)
    }

}

module.exports = new FolderController()