'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const response = require('../response')
const db = require('../settings/db')
const config = require('./../config')

exports.getAllUsers = (req, res) => {

    db.all('SELECT `id`, `nickName`, `email` FROM `users`', (error, rows) => {
        if(error) {
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.signup = (req, res) => {

    db.all("SELECT `id`, `email`, `nickName` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows) => {
        if(error) {
            response.status(400, error, res)
        } else if(typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, {message: `Пользователь с таким email - ${rw.email} уже зарегистрирован!`}, res)
                return true
            })
        } else {
            const email = req.body.email
            const name = req.body.nickName

            const salt = bcrypt.genSaltSync(15)
            const password = bcrypt.hashSync(req.body.password, salt)

            const sql = "INSERT INTO `users`(`nickName`, `email`, `password`) VALUES('" + name + "', '" + email + "', '" + password + "')";
            db.run(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: `Регистрация прошла успешно.`, results}, res)
                }
            })

        }
    })

}

exports.signin = (req, res) => {

    db.all("SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else if(rows.length <= 0) {
            response.status(401, {message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.`}, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if(password) {
                    //Если true мы пускаем юзера и генерируем токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: '1h' })

                    response.status(200, {message: `Успешная авторизация`,token: `Bearer ${token}`}, res)

                } else {
                    //Выкидываем ошибку что пароль не верный
                    response.status(401, {message: `Неправильный пароль. Повторите попытку`}, res)

                }
                return true
            })
        }
    })

}