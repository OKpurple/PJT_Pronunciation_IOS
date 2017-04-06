var express = require('express');
var router = express.Router();
var client_id = 'hlRLHE6xd8d_ImTr9Ihu';
var client_secret = 'GnTqv1n6ik';


router.get('/:text', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/voice/tts.bin';
   var request = require('request');

   var options = {
       url: api_url,
       form: {'speaker':'mijin', 'speed':'0', 'text':req.params.text},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

    var _req = request.post(options).on('response', function(response) {
       console.log(response.statusCode) // 200
       console.log(response.headers['content-type'])
    });

  _req.pipe(res); // 브라우저로 출력
 });



module.exports = router;
