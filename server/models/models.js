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

const Photo = sequelize.define('photos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    createdAtDate: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER},
    hash: {type: DataTypes.STRING, unique:true, allowNull: false},
    ext: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING}
}, {
    timestamps: false
})

const Date = sequelize.define('dates',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    createdAtDate: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {
    timestamps: false
})




module.exports = {
    User,
    Photo,
    Date
}





