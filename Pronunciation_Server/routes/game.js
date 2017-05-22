var express = require('express');
var router = express.Router();
var client_id = 'hlRLHE6xd8d_ImTr9Ihu';
var client_secret = 'GnTqv1n6ik';
var utils = require('../utils.js');

router.get('/tts/:text', function (req, res) {
  console.log('음성합성');
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



router.get('/words/:cnt',(req,res)=>{
  console.log('게임 단어 받기');
  var words1 = ['사랑','정열','희망','보람','사과','바나나','고행','귀걸이','선풍기','소리']
  var words2 = ['미디어소프트','융합소프트','간장공장장','돌청바지','일렉트릭기타','위생식염수','극세사이불','나르샤','카레라이스','냉우동모밀']
  var words3 = ['사랑해요 그대를','기억하나요 우리의 추억','아름다운 금수강산','형돈이와 데프콘','인터랙티브 디자인','태극기 휘날리며','육룡이 나르샤','빨래를 널다','저녁식사를 하다','그에게 꽃을 선물 받다']
  var level = req.params.cnt;

  if(level == 1){
    res.json({
      data : words1
    })
  }else if (level == 2) {
    res.json({
      data : words2
    })
  }else{
    res.json({
      data : words3
    })
  }
})

module.exports = router;
