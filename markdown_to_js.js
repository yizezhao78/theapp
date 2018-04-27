var fs = require('fs');

var walkPath = './xxsc_data';
var fileList = [];
var fileData = ''
var menuData = {}
var walk = function (dir, done) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      return done(error);
    }

    var i = 0;

    (function next () {
      var file = list[i++];

      if (!file) {
        return done(null);
      }

      file = dir + '/' + file;

      fs.stat(file, function (error, stat) {

        if (stat && stat.isDirectory()) {
          walk(file, function (error) {
            next();
          });
        } else {
          // do stuff to file here
          fileList.push(file)
          next();
        }
      });
    })();
  });
};

var readFiles = function (fileList, done) {
  var i = 0;

  (function next () {
    var file = fileList[i++];

    if (!file) {
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
      menuData[title] = variableName
      console.log(title);
      next();
    });

  })();
}

var writeFile = function (fileData, menuData) {
  fs.writeFile("./xxsc_data_js/data.js", fileData, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The bookData was saved!");
  });
  stringMenuData = 'export const menuData =' + JSON.stringify(menuData)
  fs.writeFile("./xxsc_data_js/menu.js", stringMenuData, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The menuData was saved!");
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
        writeFile(fileData, menuData)
        console.log('-------------------------------------------------------------');
        console.log('finished. reading');
        console.log('-------------------------------------------------------------');      }
    });
  }
});
