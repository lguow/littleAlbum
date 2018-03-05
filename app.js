var express = require("express");
var app = express();
// var router = require(__dirname + "/controller/router.js")
var router = require(__dirname + "/controller")

//设置模板引擎
app.set("view engine","ejs");

//路由中间件
//静态文件夹
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);
app.get("/up",router.showUp);
app.get("/cd",router.createDir);
app.post("/up",router.doPost);


//最后404
app.use(function(req,res){
    res.render("err")
})
app.listen(80,'127.0.0.1',function(){
    console.log('成功开启服务器')
})