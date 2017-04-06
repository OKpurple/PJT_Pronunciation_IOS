var express = require('express');
var app = express();

var tts = require('./routes/tts.js')

app.use('/tts',tts);

 app.listen(33200, function () {
   console.log('http://127.0.0.1:3000/tts app listening on port 3000!');
 });
