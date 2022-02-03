const sqlite = require('sqlite3')
const config = require('../config')

const connection = new sqlite.Database('./Database/private-photohosting.db', (err) => {
    if(err) {
        console.log(err)
        return console.log('Ошибка подключения к БД!');
    } else {
        return console.log('Подлючение успешно!');
    }
})

module.exports = connection