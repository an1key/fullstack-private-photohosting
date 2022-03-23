require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const ocsp = require('ocsp')
const HTTP_PORT = process.env.HTTP_PORT || 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const ocspCache = new ocsp.Cache()
const options = {
    key: fs.readFileSync('./cert/private.key'),
    cert: fs.readFileSync('./cert/cert.pem'),
};

const httpsServer = https.createServer(options,app);
const httpServer = http.createServer(app);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        httpsServer.listen(HTTPS_PORT, () => console.log(`HTTPS Server started on port ${HTTPS_PORT}`));
        httpServer.listen(HTTP_PORT, () => console.log(`HTTP Server started on port ${HTTP_PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start();


httpsServer.on('OCSPRequest', function(cert, issuer, callback) {
    ocsp.getOCSPURI(cert, function(err, uri) {
        if (err) return callback(error);
        var req = ocsp.request.generate(cert, issuer);
        var options = {
            url: uri,
            ocsp: req.data
        };
        ocspCache.request(req.id, options, callback);
    });
});
httpServer.on('OCSPRequest', function(cert, issuer, callback) {
    ocsp.getOCSPURI(cert, function(err, uri) {
        if (err) return callback(error);
        var req = ocsp.request.generate(cert, issuer);
        var options = {
            url: uri,
            ocsp: req.data
        };
        ocspCache.request(req.id, options, callback);
    });
});
