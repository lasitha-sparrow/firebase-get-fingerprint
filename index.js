var express = require("express");
const sslCertificate = require('get-ssl-certificate')
var app = express();
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
app.get('/getkey', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    sslCertificate.get('test.firebaseio.com').then(function (certificate) {
      var frg = certificate.fingerprint;
      frg = frg.replace(/:/g,' ');
      console.log(frg)
      res.send(JSON.stringify({ fingerprint: frg }));
    });
});
app.get('/', function(req, res) {
    res.send('Hello this is Firebaseio fingerprint getter, Please enjoy :)');
});
