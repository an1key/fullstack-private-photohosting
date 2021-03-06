const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const date = require('date-and-time');
const {User} = require('../models/models')

const generateJwt = (id, email, nick, role) => {
    return jwt.sign(
        {id, email, nick, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, nick, comment, password} = req.body
        if (!email || !password || !nick) {
            return next(ApiError.badRequest('Некорректный email, имя или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({nick: nick, email: email, password: hashPassword, comment: comment})
        const token = generateJwt(user.id, user.email, user.nick, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.nick, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.nick, req.user.role)
        return res.json({token})
    }

    async modify(req, res, next){
        const userId = req.body.id;
        const targetRole = req.body.role;
        if( !userId || !targetRole) return next(ApiError.badRequest('Неправильно указаны параметры'));
        const user = await User.findOne({where: {id : userId}});
        if(!user) return next(ApiError.badRequest('Такого пользователя не существует'));
        await user.update({role: targetRole})
        return res.json(`modified user with email "${userId}". New role is "${user.role}"`)
    }
    async getAllUsers(req, res, next)
    {
        const users = await User.findAndCountAll({where:{
        }});
        return res.json(users);
    }
}

module.exports = new UserController()
