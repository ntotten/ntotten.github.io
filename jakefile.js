var compressor = require('node-minify')
  , uuid = require('uuid')
  , os = require('os')
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , config = {
        rootPath: __dirname,
        version: uuid.v4(),
    };

var windows = os.platform() == 'win32';

task('default', ['assets'])

desc("assets")
task('assets', ['minify:all', 'version']);


namespace('minify', function() {

  task('all', ['cleanup', 'js', 'css'])

  desc("cleanup")
  task('cleanup', function() {
    // Clean up old files
    var files = fs.readdirSync('./assets/');
    for (var i = files.length - 1; i >= 0; i--) {
      var file = files[i];
      if (path.extname(file) == '.js' || path.extname(file) == '.css') {
        fs.unlinkSync('./assets/' + file);
      }
    };
  });

  desc('js')
  task('js', {async: true}, function() {
    // Using UglifyJS for JS
    new compressor.minify({
      type: 'uglifyjs',
      fileIn: [
        'assets/js/ace/ace.js', 
        'assets/js/app.js'
      ],
      fileOut: 'assets/' + config.version + '.js',
      callback: function(err){
        if (err) {
          console.error('Error minifying javascript.')
          console.error(err);
        } else {
          console.log('JS Minified')
        }
        complete();
      }
    });  
  });

  desc('css')
  task('css', {async: true}, function() {
    // Using Sqwish for CSS
    new compressor.minify({
      type: 'sqwish',
      fileIn: [
        'assets/css/bootstrap.min.css', 
        'assets/css/style.css'
      ],
      fileOut: 'assets/' + config.version + '.css',
      callback: function(err){
        if (err) {
          console.error('Error minifying css.')
          console.error(err);
        } else {
          console.log('CSS minified')
        }
        complete();
      }
    });
  });

});

desc("version")
task('version', function() {
  console.log('Setting config version.')
  setConfigValue('version', config.version);

  //if (windows) {
  //  spawn('C:/Ruby193/bin/jekyll.bat', [], { stdio: 'inherit' });
  //} else {
  //  console.log("TODO: SETUP OS X")
  //}
});


desc("Redirects")
task('redirects', function() {
  var files = fs.readdirSync('./_posts/');
  for (var i = files.length - 1; i >= 0; i--) {
    var file = files[i].replace('.md', '');
    var year = file.substr(0, 4);
    var month = file.substr(5, 2);
    var day = file.substr(8, 2);
    var slug = file.substr(11);

    var yearDir = './' + year;
    var yearExists = fs.existsSync(yearDir);
    if (!yearExists) {
      fs.mkdirSync(yearDir);
    }

    var monthDir = yearDir + '/' + month;
    var monthExists = fs.existsSync(monthDir);
    if (!monthExists) {
      fs.mkdirSync(monthDir);
    }

    var slugDir = monthDir + '/' + slug;
    var slugExists = fs.existsSync(slugDir); 
    if (!slugExists) {
      fs.mkdirSync(slugDir);
    }

    var indexFile = slugDir + '/index.html';
    var indexExists = fs.existsSync(indexFile);
    if (!indexExists) {
      var url = '/' + year + '/' + month + '/' + day + '/' + slug + '/';
      var html =  '<!DOCTYPE html>\n' + 
                  '<html>\n' +
                  '<head>\n' +
                  '<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n' +
                  '<meta http-equiv="refresh" content="0;url=' + url + '" />\n' +
                  '</head>\n' +
                  '</html>';
      fs.writeFileSync(indexFile, html, 'utf8');
    }
  };
})



function setConfigValue(key, value) {
  var file = './_config.yml';
  var lines = fs.readFileSync(file, 'utf8').split('\n');
  for (var i = lines.length - 1; i >= 0; i--) {
    var keyValue = lines[i].split(':')[0];
    if (keyValue == key) {
      lines[i] = keyValue + ': ' + value;
    }
  };
  var s = lines.join('\n');
  console.log('Writing config.')
  fs.writeFileSync(file, s, 'utf8');
  console.log('Config saved.')
}