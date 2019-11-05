var express = require('express');
var router = express.Router();

let db = require('../db/db');

let PW = require('png-word');
PW = PW(PW.GRAY);

let r = require('random-word');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {list:db.getList(),logined:req.session.logined});
});


router.post('/add',function (req,res) {
  let name = req.body.name;
  let content = req.body.content;

  db.add({
    "name":name,
    "content":content
  });

  res.redirect("/");

});

router.get('/del',function (req,res) {

  let index = req.query.index;

  db.del(index);

  res.redirect("/");
});

router.get('/get/:index',function (req,res) {

  let index = req.params.index;
  console.log(index)

  res.send(db.get(index));

});

router.post('/update',function (req,res) {

  let article = req.body;

  console.log(article)

  db.update(article.index,article);
  res.redirect("/");
});


router.post('/login',function (req,res) {

  let username = req.body.username;
  let password = req.body.password;
  let vnumForm = req.body.vnum;

  let vnum = req.session.randomNum;

  if(vnumForm !== vnum){
    res.send("验证码不正确");
    return
  }

  if(username === 'liang' && password === '123456'){
    req.session.logined = true;
    res.redirect("/");
  }else {
    res.send("error");
  }


});

router.get('/logout',function (req,res) {
  req.session.logined = false;
  res.redirect("/");
});

router.get('/refresh',function (req,res) {

  let num = req.session.randomNum = r(1);


  PW.createPNG(num,function (pngNum) {
    res.send(pngNum)
  });
  


});

module.exports = router;
