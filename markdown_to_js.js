var fs = require('fs');

var walkPath = './cssa_xxsc';
var walkImagePath = './cssa_xxsc/.gitbook/assets'
var fileList = [];
var imageList = [];
var fileData = '';
var fileDataForWWMP = ''; //微信小程序数据格式
var menuData = {};
var imageData = {};
var exportDataForWWMP = 'module.exports = { \n';

var walkImage = function (dir, done) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      return done(error);
    }

    var i = 0;

    (function next () {
      var file = list[i++];
      var filename = file;
      if (!file) {
        return done(null);
      }
        file = dir + '/' + file;

        fs.stat(file, function (error, stat) {
          if (filename !== '.git') {
            if (stat && stat.isDirectory()) {
              walk(file, function (error) {
                next();
              });
            } else {
              if (filename !== '.DS_Store') {
                imageList.push(filename)
              }
              next();
            }
          } else {
            next()
          }
        });
      // }
    })();
  });
};

var walk = function (dir, done) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      return done(error);
    }

    var i = 0;

    (function next () {
      var file = list[i++];
      var filename = file;
      if (!file) {
        return done(null);
      }
      // if (file === '.DS_Store') {
      //   console.log('ignore')
      // } else {
        file = dir + '/' + file;

        fs.stat(file, function (error, stat) {
          if (filename !== '.git' && filename !== '.gitbook') {
            if (stat && stat.isDirectory()) {
              walk(file, function (error) {
                next();
              });
            } else {
              if (filename !== '.DS_Store') {
                fileList.push(file)
              }
              next();
            }
          } else {
            next()
          }
        });
      // }
    })();
  });
};

var readFiles = function (fileList, done) {
  var i = 0;
  (function next () {
    var file = fileList[i++];

    if (!file) {

      exportDataForWWMP = exportDataForWWMP.substring(0, exportDataForWWMP.length - 3);
      exportDataForWWMP = exportDataForWWMP + '}'
      fileDataForWWMP = fileDataForWWMP + '\n' + exportDataForWWMP
      return done(null);
    }

    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var title = data.split('\n')[0].substring(2)
      var variableName = file.substring(12).replace(/[\/-]/g, '_')
      variableName = variableName.replace('.md', '')
      fileData = fileData + '\n' + "export const " + variableName +" = ` \n" + data + "`"
      fileDataForWWMP =  fileDataForWWMP + '\n' + "var " + variableName +" = ` \n" + data + "`"
      menuData[title] = variableName
      exportDataForWWMP = exportDataForWWMP + "'" + variableName + "':" + variableName + ', \n'
      next();
    });

  })();
}

var writeFile = function () {
  fs.writeFile("./xxsc_data_js/data.js", fileData, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The bookData was saved!");
  });
  fs.writeFile("./xxsc_data_js/data_wwmp.js", fileDataForWWMP, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The bookData for wechat mini program was saved!");
  });
  stringMenuData = 'export const menuData =' + JSON.stringify(menuData)
  stringWechatMenuData = 'module.exports =' + JSON.stringify(menuData)
  fs.writeFile("./xxsc_data_js/menu.js", stringMenuData, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The menuData was saved!");
  });
  fs.writeFile("./xxsc_data_js/menu_wxmp.js", stringWechatMenuData, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The menuData was saved!");
  });
}

var writeImageExportModuleForRN = function () {
  var data = 'const images = {'
  for (var i=0;i<imageList.length;i++) {
    var imageName = imageList[i]
    if (i == 0) {
      data = data + `'${imageName}':require('../cssa_xxsc/.gitbook/assets/${imageName}')`
    } else {
      data = data + `, \n'${imageName}':require('../cssa_xxsc/.gitbook/assets/${imageName}')`
    }
  }
  data = data + '}\n export default images;'
  fs.writeFile("./xxsc_data_js/image.js", data, function(err) {
    if (err) {
      return console.log(err);
      console.log("finished writing imageModuleForRN")
    }
  });
}

process.argv.forEach(function (val, index, array) {
  if (val.indexOf('source') !== -1) {
    walkPath = val.split('=')[1];
  }
});

console.log('-------------------------------------------------------------');
console.log('processing...');
console.log('-------------------------------------------------------------');

walk(walkPath, function(error) {
  if (error) {
    throw error;
  } else {
    console.log('-------------------------------------------------------------');
    console.log('finished. walking');
    console.log('-------------------------------------------------------------');
    readFiles(fileList, function(error) {
      if (error) {
        throw error;
      } else {
        writeFile()
        console.log('-------------------------------------------------------------');
        console.log('finished. reading');
        console.log('-------------------------------------------------------------');      }
    });
  }
});

walkImage(walkImagePath, function(error) {
  if (error) {
    throw error;
  } else {
    writeImageExportModuleForRN()
  }
});
