const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    passport = require('passport')
var ocsp = require('ocsp')
const port = 25565;
const host = '127.0.0.1';
const app = express();


//app.use("/",express.static(public));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)


const routes = require('./settings/routes')
routes(app)

var ocspCache = new ocsp.Cache()
var options = {
    key: fs.readFileSync('./cert/private.key'),
    cert: fs.readFileSync('./cert/cert.pem'),
};

const httpsServer = https.createServer(
        {
        key: fs.readFileSync('./cert/private.key'),
        cert: fs.readFileSync('./cert/cert.pem'),
        },
        app
    )
httpsServer.listen(port);

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