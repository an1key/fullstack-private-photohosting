const imageThumbnail = require('image-thumbnail');
const fs = require('fs')
const path = require('path')
const ExifImage = require('exif').ExifImage;
const ffmpeg = require('ffmpeg-static')
const jimp = require('jimp')
const img = `./res/IMG_0020.JPG`



const options = {
    width: 500,
    height: 500,
    withMetadata: true,
    fit: "cover",

    jpegOptions: { force:true, quality:90 }
}


var size = 0;
new ExifImage({ image : `${path.resolve(__dirname, img)}` },async function (error, exifData)
{
    var width = exifData.exif.ExifImageWidth
    var height = exifData.exif.ExifImageHeight
    var image = jimp.read(img);
    if(width >= height)
    {
        size = height;
    }else
    {
        size = width;
    }
    console.log(size)
    jimp.read(img).then((image)=>{
        image
        .crop(((width-size)/2),((height-size)/2),size,size)
        .resize(500,500)
        .quality(60)
        .write(`./res/thumb/TH.JPG`)
    })
})
