const fs = require('fs'),
    https = require('https'),
    express = require('express'),
    ocsp = require('ocsp');

const port = 25565;

const app = express();

const ocspCache = new ocsp.Cache();
const privateKey = fs.readFileSync('./cert/private.key');
const certificate = fs.readFileSync('./cert/cert.pem');
var options = {
    key: privateKey,
    cert: certificate,
};
const httpsServer = https.createServer(options,app);
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