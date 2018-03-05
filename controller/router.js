var file = require("../modules/file.js");
var formidable = require("formidable");
var util = require('util');
var path = require("path");
var fs = require("fs");
var url = require("url");

exports.showIndex = function(req,res,next){

    file.getAllAlbum(function(err,AllAlbum,next){
        if(err){
            next();
            return;
        }
        res.render('index', {
            'albums': AllAlbum
        });
    })

};
exports.showAlbum = function(req,res,next){
   //遍历相册中的所有图片
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function (err,imageArr) {
        if(err){
            next();
            return;
        }
        res.render('album2',{
            "albumname": albumName,
            "images": imageArr
        })
    })
};
exports.showUp = function (req, res,next) {
    file.getAllAlbum(function(err,albums){
        if(err){
            next();
            return;
        }
        res.render('up',{
            'albums':albums
        });
    })

};
exports.doPost = function(req,res,next){
    // res.writeHead(200, {'content-type': 'text/html;charset=UTF8'});
    // res.end("<h1>管理员已禁止该功能!!!</h1>");
        var form = new formidable.IncomingForm();

        form.uploadDir = path.normalize(__dirname+"/../tempup/");
        form.parse(req, function(err, fields, files,next) {
            if(err){
                next();
                return;
            }
            res.writeHead(200, {'content-type': 'text/plain;charset=UTF8'});
            // console.log(util.inspect({fields: fields, files: files}))
            
            
            //判断文件大小
            var picsize = parseInt(files.tupian.size)/1024;
            if(picsize  < 1){
                res.end('<h1>你还没有选择图片</h1>');
                fs.unlink(files.tupian.path ,function(){
                    console.log('删除成功')
                });
                return;
            };
            if(picsize > 1024){
                res.end('<h1>图片太大，不能上传!</h1>');
                fs.unlink(files.tupian.path ,function(){
                    console.log('删除成功')
                });
                return;
            }
            // // 改名
            var wenjianjia = fields.wenjianjia;
            var extname = path.extname(files.tupian.name);
            var oldpath = files.tupian.path;
            var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/") + (+new Date())+ extname;
            fs.rename(oldpath,newpath,function(err,date){
                if(err){
                    next();
                    return;
                };
                res.end("上传成功")
            });
        });

};
//创建相册
exports.createDir = function(req,res,next){
    dirName = url.parse(req.url,true).query.filename;
    fs.mkdir(path.normalize(__dirname + "/../uploads/" + dirName ),function(err,data){
        if(err){
            next();
            return
        }
        res.end("success")
    })
}
