const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');
var ocsp = require('ocsp')
const port = 25565;
const host = '127.0.0.1';
const app = express();
var public = path.join(__dirname,'public')
const usersRoutes = require('./routes/users.js');
const apiRoutes = require('./routes/api.js');
app.use("/",express.static(public));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.get("/", function(req, res){
    res.send("HELLOW!");
});




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