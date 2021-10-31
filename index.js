const express = require('express')
const cookieParser = require("cookie-parser");
const https = require('https');
const app = express()
const path = require('path');
const port = 3000
const fs = require('fs');
const cors = require('cors');

// https://certificatetools.com/
const privateKey = fs.readFileSync(path.join(__dirname, 'cert.key'));
// openssl x509 -signkey cert.key -in cert.csr -req -days 3650 -out cert.crt
const cert = fs.readFileSync(path.join(__dirname, 'cert.crt'));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// https://expressjs.com/en/resources/middleware/cors.html
var corsOptions = {
    origin: function (origin, callback) {
        callback(null, origin)
    },

    // When a request's credentials mode (Request.credentials) is include, browsers
    // will only expose the response to the frontend JavaScript code if the
    // Access-Control-Allow-Credentials value is true.
    // Cf. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
    credentials: true,
}

app.get('/cookie', cors(corsOptions), (req, res, next) => {
    res.cookie('name', 'geeksforgeeks', { sameSite: 'None', secure: true, });
    res.json({
        "message": "cookies : " + JSON.stringify(req.cookies)
    })
})

var server = https.createServer({
    key: privateKey,
    cert: cert
}, app);

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

