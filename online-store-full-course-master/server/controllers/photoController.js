'use strict'
const path = require('path');
const config = require('../config');
const date = require('date-and-time')
const fs = require('fs');
const {Photo} = require('../models/models')
const ApiError = require('../error/ApiError');
const ExifImage = require('exif').ExifImage;





class PhotoController {
    async create(req, res, next) {

        try {
            console.log(req.body);
            console.log(req.files)
            const {img} = req.files;
            console.log(img.length);
            var uploadErrors = 0;

            for await (var image of img){
 //GYJTJETEUTJU
                console.log(image.name)
                try {
                    let {authorId} = req.body;
                    console.log(typeof(image));
                    let hash = image.md5;
                    let ext = path.extname(image.name);
                    let name = image.name;
                    let fileName = `${hash}.${ext}`
                    console.log(config.path_to_images);
                    const photo = await Photo.findOne({where:{hash}})
                    if(photo)
                    {
                        uploadErrors = uploadErrors + 1;
                        continue;
                    }
                    image.mv(path.resolve(config.path_to_images, fileName), (error)=>
                    {
                        if (error) return next(ApiError.badRequest(error.message));
                        console.log(config.path_to_images);
                            new ExifImage({ image : `${path.resolve(config.path_to_images, fileName)}` },async function (error, exifData) {
                                if (error){
                                    console.log('Error: '+error.message);
                                    let {birthtime} = fs.statSync(path.resolve(config.path_to_images, fileName));
                                    let birthday = `${date.format(birthtime, 'DD/MM/YYYY')}`
                                    console.log(birthday); 
                                    try{
                                        const photo = await Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                        console.log(photo);
                                    } catch (e){
                                        console.log(e)
                                        next(ApiError.badRequest(e.message))
                                    }
                                }
                                else{
                                    console.log(exifData);
                                    var data = date.parse(exifData.exif.DateTimeOriginal, 'YYYY:MM:DD HH:mm:ss')
                                    let birthday = `${date.format(data, 'DD/MM/YYYY')}`
                                    console.log(birthday);
                                    try{
                                        const photo = await Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                        console.log(photo);

                                    } catch (e){
                                        console.log(e)
                                        next(ApiError.badRequest(e.message))
                                    }
                                }
                            });
                })} catch (e) {
                    console.log(e);
                    next(ApiError.badRequest(e.message))
                }
            }

            await console.log(`Загружено ${img.length - uploadErrors} файлов из ${img.length}`);
            await res.json(`Загружено ${img.length - uploadErrors} файлов из ${img.length}`);
                      
        } catch (e) {
            console.log(e);
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
            photos = await Photo.findAndCountAll({where: createdAt, limit, offset})
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
        return res.json(photo)
    }
}

module.exports = new PhotoController()
