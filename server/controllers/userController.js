const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const {User, Folder} = require('../models/models')
const ApiError = require('../error/ApiError')

const generateJwt = (id, username, email, birthday_date, role, is_blocked) => {
    return jwt.sign(
        {id, username, email, birthday_date, role, is_blocked},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )    
}

class UserController {
    async registration(req, res, next) {
        
        const {Username, Email, Password, Role, Birthday_date} = req.body
        console.log(req.body);
        //const {Avatar} = req.files
        //let fileName = uuid.v4() + ".jpg"
        //Avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

        if (!Username || !Email || !Password || !Birthday_date) {
            return next(ApiError.badRequest('Введены не все данные!'))
        }
        const candidateUsername = await User.findOne({where: {Username}})
        if (candidateUsername) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует!'))
        }
        const candidateEmail = await User.findOne({where: {Email}})
        if (candidateEmail) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
        }

        const hashPassword = await bcrypt.hash(Password, 5)

        //const user = await User.create({Username, Email, Password: hashPassword, Avatar: fileName, Role, Birthday_date})
        const user = await User.create({Username, Email, Password: hashPassword, Role, Birthday_date})

        const token = generateJwt(user.User_id, user.Username, user.Email, user.Birthday_date, user.Role, user.Is_blocked)

        await Folder.create({
            User_id: user.User_id,
            Folder_name: 'Избранные',
            Description: 'Тут будут храниться ваши любимые фильмы! :)'
          })

        await Folder.create({
            User_id: user.User_id,
            Folder_name: 'Просмотренные',
            Description: 'Тут будут храниться просмотренные фильмы и фильмы с вашей оценкой! :3'
          })

        return res.json(token)
    }

    async login(req, res, next) {
        const {Username, Password} = req.body
        const user = await User.findOne({where: {Username}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден!'))
        }
        let comparePassword = bcrypt.compareSync(Password, user.Password)
        if (!comparePassword) {
            return next(ApiError.internal('Введен неверный пароль!'))
        }
        const token = generateJwt(user.User_id, user.Username, user.Email, user.Birthday_date, user.Role, user.Is_blocked)
        return res.json(token)
    }

    async check(req, res, next) {
       const token = generateJwt(req.user.User_id, req.user.Username, req.user.Email, req.user.Birthday_date, req.user.Role, req.user.Is_blocked)
       return res.json({token})
    }
}

module.exports = new UserController()