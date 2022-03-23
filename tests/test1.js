const ExifImage = require('exif').ExifImage;
const path = require('path')
const sharp = require('sharp');

var img1 = `res/IMG_0020.JPG`;
var img2 = `res/IMG_0278.JPG`;

new ExifImage({ image : `${path.resolve(__dirname, img1)}` },async function (error, exifData)
{
    var width = exifData.exif.ExifImageWidth
    var height = exifData.exif.ExifImageHeight
    if(width >= height)
    {
        size = height;
    }else
    {
        size = width;
    }
    sharp(img1)

        .rotate()
        .resize(500,500,{
            withMetadata: true,
            fit: "cover",
            jpegOptions: { force:true, quality:90 }
        }).toFile('res/thumb/IMG.JPG')
})
new ExifImage({ image : `${path.resolve(__dirname, img2)}` },async function (error, exifData)
{
    var width = exifData.exif.ExifImageWidth
    var height = exifData.exif.ExifImageHeight
    if(width >= height)
    {
        size = height;
    }else
    {
        size = width;
    }
    sharp(img2)
        .resize(size,size,
        {
            fit: "cover"
        })
        .rotate()
        .resize(500,500,{
            withMetadata: true,
            fit: "cover",
            jpegOptions: { force:true, quality:90 }
        }).toFile('res/thumb/IMG2.JPG')
})