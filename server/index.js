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
const PORT = process.env.PORT || 443
const fs = require('fs')
const https = require('https')
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
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        httpsServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start()


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
