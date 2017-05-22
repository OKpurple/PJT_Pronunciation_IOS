var express = require('express');
var app = express();

var game = require('./routes/game.js')
var users = require('./routes/user.js')
app.use('/game',game);
app.use('/users',users);

 app.listen(8081, function () {
   console.log('ProEdu server started');
 });
