const md5 = require('md5')
const path = require('path');
const fs = require('fs');
const {Photo} = require('../models/models')
const ApiError = require('../error/ApiError');

class PhotoController {
    async create(req, res, next) {
        try {
            let {authorId} = req.body // Здесь добавить айди автора чтобы добавлять в бд
            const {img} = req.files
            let fileName = md5(img) + ".jpg" // тут вместо ууида считать хэш
            let {birthtime} = fs.statSync(img);
            let birthtday = date.format(birthtime, 'DD/MM/YYYY')
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const photo = await Photo.create({createdAt: birthtday, createdById: authorId, img: fileName});

            return res.json(photo)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {createdAt, limit, page} = req.query
        page = page || 1;
        limit = limit || 30;
        let offset = page * limit - limit;
        let photos;
        if (!createdAt) {
            photos = await Photo.findAndCountAll({limit, offset})
        }
        if (createdAt) {
            photos = await Device.findAndCountAll({where: createdAt, limit, offset})
        }
        return res.json(photos)
    }

    async getOne(req, res) {
        const {id} = req.params
        const photo = await Photo.findOne(
            {
                where: {id},
                include:[['dateofcreation','createdAt']]
            },
        )
        return res.json(device)
    }
}

module.exports = new PhotoController()
