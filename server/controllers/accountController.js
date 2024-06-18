const uuid = require('uuid')
const path = require('path')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

class AccountController {
    async getAll(req, res) {
        let folders = await User.findAndCountAll({order: [['User_id', 'ASC']]}) 

        return res.json(folders)
    } 

    async getOne(req, res) {
        const {User_id} = req.params

        let folders = await User.findOne({where: { User_id }}) 

        return res.json(folders)
    }

    async change(req, res, next) {
        try {
            const {User_id, Username, Email, Birthday_date} = req.body
            const checkUsername = await User.findOne({where: {Username}})
            const checkUsername1 = await User.findOne({where: { User_id, Username}})
            const checkEmail = await User.findOne({where: {Email}})
            const checkEmail1 = await User.findOne({where: {User_id, Email}})
            if (!checkUsername1 && checkUsername) {
                return next(ApiError.internal('Такой username уже занят!'))
            }
            else if (!checkEmail1 && checkEmail) {
                return next(ApiError.internal('Такой email уже занят!'))
            }
            let user
            let fileName = uuid.v4() + ".jpg"  
            if(req.files) {
                const {Avatar} = req.files                                              
                Avatar.mv(path.resolve(__dirname, '..', 'static', fileName))    
                user = await User.update({ Username, Avatar: fileName, Email, Birthday_date }, { where: { User_id } })
                return res.json(user)
            } else {
                user = await User.update({ Username, Email, Birthday_date }, { where: { User_id } })
                return res.json(user)
            }            
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeRole(req, res) {
        const {User_id, Role} = req.body

        let user = await User.update({Role}, {where: { User_id }}) 

        return res.json(user)
    }

    async changeIsBlocked(req, res) {
        const {User_id, Is_blocked} = req.body

        let user = await User.update({Is_blocked}, {where: { User_id }}) 

        return res.json(user)
    }

}

module.exports = new AccountController()