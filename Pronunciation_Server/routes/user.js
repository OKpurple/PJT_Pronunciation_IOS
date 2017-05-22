var express = require('express');
var router = express.Router();
var utils = require(`../utils.js`);

router.post('/regist',(req,res)=>{
  console.log("회원가입");
  var login_id = req.body.login_id;
  var login_pw = req.body.login_pw;
  var user_name = req.body.user_name;

  if(login_id == "undefined" || login_pw == "undefined" || user_name =="undefined"){
    res.json({
      meta: {
                code: -11,
                message: "body attr undefined"
      }
    })
  }

  utils.dbConnect(res).then((conn)=>{
    utils.query(conn,res,`SELECT * FROM user WHERE login_id = ?`,[login_id]).then((selectRes)=>{
      if(selectRes.length !== 0){
        conn.release()
        res.json({
          meta:{
          code : -20 ,
          message : "이미 존재하는 아이디"
          }
        })
      }else{
        utils.query(conn,res,`INSERT INTO user(login_id,login_pw,user_name) values(?,?,?)`,[login_id,login_pw,user_name]).then((insertRes)=>{
          conn.release()
          res.json(utils.SUCCESS)
        })
      }
    })
  })
});

router.post('/login',(req,res)=>{
  console.log("로그인");
  var login_id = req.body.login_id;
  var login_pw = req.body.login_pw;

  if(login_id == "undefined" || login_pw == "undefined"){
    res.json({
      meta: {
                code: -11,
                message: "body attr undefined"
      }
    })
  }

  utils.dbConnect(res).then((conn)=>{
    utils.query(conn,res,`SELECT * FROM user WHERE login_id = ?`,[login_id]).then((sel1Res)=>{
      if(sel1Res.length === 0){
        conn.release()
        res.json({
          meta:{
          code : -21 ,
          message : "없는 아이디"
          }
        })
      }else{
        utils.query(conn,res,`SELECT * FROM user WHERE login_id = ? AND login_pw = ?`,[login_id,login_pw]).then((sel2Res)=>{
          conn.release();
          if(sel2Res.length === 0){
            res.json({
              meta:{
              code : -23 ,
              message : "없는 PW"
              }
            })
          }else{
            res.json(utils.SUCCESS);
          }
        })
      }
    })
  })
});

router.get('/:loginId',(req,res)=>{
    console.log("내정보");
    var login_id = req.params.loginId;

    utils.dbConnect(res).then((conn)=>{
      utils.query(conn,res,`SELECT login_id,name,score FROM user WHERE login_id = ?`,[login_id]).then((selRes)=>{
        if(selRes.length === 0 ){
          conn.release();
          res.json({
            meta:{
            code : -21 ,
            message : "없는 아이디"
            }
          })
        }else{
          utils.query(conn,res,`
            SELECT u.* FROM user u,
              (SELECT score FROM user WHERE login_id = ?) myc
              WHERE u.score > myc.score`,[login_id]).then((ranking)=>{
                var myrank = ranking.length
                conn.release();
                res.json(utils.toRes(utils.SUCCESS,{
                  data : selRes,
                  myrank : myrank
                }))
              })
        }
      })
    })
})

router.get('/ranking',(req,res)=>{
    console.log("랭킹 순위");
    var login_id = req.params.loginId;

    utils.dbConnect(res).then((conn)=>{
      utils.query(conn,res,`SELECT login_id,user,user_name,score FROM user ORDER BY score DESC LIMIT 20`,[login_id]).then((selRes)=>{
        conn.release();
        res.json(utils.toRes(utils.SUCCESS,{
          data : selRes
        }))
      })
    })
})
module.exports = router;
