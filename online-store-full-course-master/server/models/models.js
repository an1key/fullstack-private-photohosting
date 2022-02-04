const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nick: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "GUEST"},
})

const Photo = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    createdAt: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING, unique:true, allowNull: false},
})



User.hasOne(Photo)
Photo.belongsTo(User)


module.exports = {
    User,
    Photo
}





