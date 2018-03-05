var fs = require("fs");

exports.getAllAlbum = function(callback){

    fs.readdir('./uploads/',function(err,files,next){
        if(err){
            next();
            return
            callback('没有找到uploads文件夹',null)
        }
        var allAlbum = [];
        (function iterator(i){
            if(i == files.length){
                // console.log(allAlbum);
                callback(null,allAlbum);
                return;
            }
          fs.stat('./uploads/'+ files[i], function(err,stats,next){
              if(err){
                  next();
                  return
                  callback('没有找到'+files[i]+'文件',null);
              }
              if(stats.isDirectory()){
                  allAlbum.push(files[i]);
              }
              iterator(i + 1);
          });
        })(0)
    });
};
exports.getAllImagesByAlbumName = function (albumName,callback) {
    fs.readdir('./uploads/'+ albumName,function(err,files){
        if(err){
            callback('没有找到uploads文件夹',null);
            return;
        }
        var allAlbum = [];
        (function iterator(i){
            if(i == files.length){
                // console.log(allAlbum);
                callback(null,allAlbum);
                return;
            }
            fs.stat('./uploads/'+ albumName+'/'+ files[i], function(err,stats){
                if(err){
                    callback('没有找到'+files[i]+'文件',null);
                    return;
                }
                if(stats.isFile()){
                    allAlbum.push(files[i]);
                  }
                iterator(i + 1);
            });
        })(0)
    });
};
