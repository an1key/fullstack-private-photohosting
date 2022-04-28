'use strict'
const path = require('path');
const config = require('../config');
const date = require('date-and-time')
const fs = require('fs');
const {Photo, Date} = require('../models/models')
const ApiError = require('../error/ApiError');
const ExifImage = require('exif').ExifImage;
const sharp = require('sharp');




class PhotoController {
    async create(req, res, next) {

        try {

            console.log(req.body);
            console.log(req.files)
            const {img} = req.files;
            console.log(img.length);
            console.log('============\n============\n============\n============\n')
            console.log(img)
            var uploadErrors = 0;
            if(Array.isArray(img)){
                console.log(true)
                for await (var image of img){

                    console.log(image.name)
                    try {
                        let {authorId} = req.body;
                        console.log(typeof(image));
                        let hash = image.md5;
                        let ext = path.extname(image.name);
                        let name = image.name;
                        let fileName = `${hash}${ext}`
                        var size;
                        console.log(config.path_to_images);
                        const photo = await Photo.findOne({where:{hash}})
                        if(photo)
                        {
                            uploadErrors = uploadErrors + 1;
                            continue;
                        }
                        image.mv(`${path.resolve(config.path_to_images, fileName)}`, (error)=>
                        {
                            if (error) return next(ApiError.badRequest(error.message));
                            console.log(config.path_to_images);
                                new ExifImage({ image : `${path.resolve(config.path_to_images, fileName)}` },async function (error, exifData) {
                                    if (error || !exifData.exif.DateTimeOriginal){
                                        let {birthtime} = fs.statSync(path.resolve(config.path_to_images, fileName));
                                        let birthday = `${date.format(birthtime, 'DD.MM.YYYY')}`
                                        console.log(birthday); 
                                        try{
                                            sharp(path.resolve(config.path_to_images, fileName))
                                                .rotate()
                                                .resize(500,500,{
                                                    withMetadata: true,
                                                    fit: "cover",
                                                    jpegOptions: { force:true, quality:90 }
                                                }).toFile(`${path.resolve(config.path_to_thumbs, fileName)}`)
                                                const photo = Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                                .then(()=>{
                                                    const date =  Date.findOne({where:{createdAtDate : birthday}}).then((date, err)=>{
                                                        console.log(date)
                                                        if(date == null){
                                                            const date = Date.create({createdAtDate: birthday}).then(()=>{
                                                                console.log(date);
                                                            })
                                                        }
                                                    })
                                                })

                                            console.log(photo);
                                        } catch (e){
                                            console.log(e)
                                            next(ApiError.badRequest(e.message))
                                        }
                                    }
                                    else{
                                        console.log(exifData);
                                        var data = date.parse(exifData.exif.DateTimeOriginal, 'YYYY:MM:DD HH:mm:ss')
                                        let birthday = `${date.format(data, 'DD.MM.YYYY')}`
                                        console.log(birthday);
                                        try{
                                            sharp(path.resolve(config.path_to_images, fileName))
                                                .rotate()
                                                .resize(500,500,{
                                                    withMetadata: true,
                                                    fit: "cover",
                                                    jpegOptions: { force:true, quality:90 }
                                                }).toFile(`${path.resolve(config.path_to_thumbs, fileName)}`)
                                                const photo = Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                                .then(()=>{
                                                    const date =  Date.findOne({where:{createdAtDate : birthday}}).then((date, err)=>{
                                                        console.log(date)
                                                        if(date == null){
                                                            const date = Date.create({createdAtDate: birthday}).then(()=>{
                                                                console.log(date);
                                                            })
                                                        }
                                                    })
                                                })

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
                await res.json({message:`Загружено ${img.length - uploadErrors} файлов из ${img.length}`,status:1111});
            }else {
                console.log(false)
                console.log(img.name)
                try {
                    let {authorId} = req.body;
                    console.log(typeof(img));
                    let hash = img.md5;
                    let ext = path.extname(img.name);
                    let name = img.name;
                    let fileName = `${hash}${ext}`
                    var size;
                    console.log(config.path_to_images);
                    const photo = await Photo.findOne({where:{hash}})
                    if(photo)
                    {
                        return res.json({message:`Это фото уже было загружено ранее`,status:2222});
                    }
                    img.mv(path.resolve(config.path_to_images, fileName), (error)=>
                    {

                        if (error) return next(ApiError.badRequest(error.message));
                        console.log(config.path_to_images);
                            new ExifImage({ image : `${path.resolve(config.path_to_images, fileName)}` },async function (error, exifData) {
                                if (error || !exifData.exif.DateTimeOriginal){
                                    let {birthtime} = fs.statSync(path.resolve(config.path_to_images, fileName));
                                    let birthday = `${date.format(birthtime, 'DD.MM.YYYY')}`
                                    console.log(birthday); 
                                    try{
                                            sharp(path.resolve(config.path_to_images, fileName))
                                            .rotate()
                                            .resize(500,500,{
                                                withMetadata: true,
                                                fit: "cover",
                                                jpegOptions: { force:true, quality:90 }
                                            }).toFile(path.resolve(config.path_to_thumbs, fileName))
                                            .then(()=>{
                                                const photo = Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                                .then(()=>{
                                                    const date =  Date.findOne({where:{createdAtDate : birthday}}).then((date, err)=>{
                                                        console.log(date)
                                                        if(date == null){
                                                            const date = Date.create({createdAtDate: birthday}).then(()=>{
                                                                console.log(date);
                                                            })
                                                        }
                                                    })
                                                    
            
                                                    console.log(photo);
                                                    return res.json({message:'Фото успешно загружено', photo:photo,status:1111});
                                                })

                                            })

                                            

                                    } catch (e){
                                        console.log(e)
                                        next(ApiError.badRequest(e.message))
                                    }
                                }
                                else{
                                    console.log(exifData);
                                    var data = date.parse(exifData.exif.DateTimeOriginal, 'YYYY:MM:DD HH:mm:ss')
                                    let birthday = `${date.format(data, 'DD.MM.YYYY')}`
                                    console.log(birthday);
                                    try{                                    
                                        sharp(path.resolve(config.path_to_images, fileName))
                                            .rotate()
                                            .resize(500,500,{
                                                withMetadata: true,
                                                fit: "cover",
                                                jpegOptions: { force:true, quality:90 }
                                            }).toFile(path.resolve(config.path_to_thumbs, fileName))
                                            .then(()=>{
                                                const photo = Photo.create({createdAtDate: birthday, createdById: authorId, hash, ext, name})
                                                .then(()=> {
                                                    const date =  Date.findOne({where:{createdAtDate : birthday}}).then((date, err)=>{
                                                        console.log(date)
                                                        if(date == null){
                                                            const date = Date.create({createdAtDate: birthday}).then(()=>{
                                                                console.log(date);
                                                            })
                                                        }
                                                    })
        
                                                    console.log(photo);
                                                    return res.json({message:'Фото успешно загружено', photo:photo,status:1111});
                                                })

                                            })

                                            
                                        

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
            


                      
        } catch (e) {
            console.log(e);
            next(ApiError.badRequest(e.message))
        }

    }

    
    async getAll(req, res) {
        let {createdAt, limit, page} = req.query
        page = page || 1;
        limit = limit || 30;
        let offset =page * limit - limit;
        let photos;
        if (!createdAt) {
            photos = await Photo.findAndCountAll({order: [
                ['id', 'DESC']
            ],limit, offset})
        }
        if (createdAt) {
            photos = await Photo.findAndCountAll({where: {createdAtDate: createdAt}, order: [
                ['id', 'DESC']
            ], limit, offset})
        }
        //photos.rows.reverse()
        return res.json(photos)
    }

    async getOne(req, res) {
        const {id} = req.params
        const photo = await Photo.findOne(
            {
                where: {id}
            },
        )
        return res.json(photo)
    }
    async getAllDates(req, res){
        const dates = await Date.findAndCountAll({where:{
        }});
        return res.json(dates)
    }
}

module.exports = new PhotoController()
