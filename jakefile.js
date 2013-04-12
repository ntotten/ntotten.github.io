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

task('default', ['minify', 'build'])

desc("minify")
task('minify', function() {
  // Clean up old files
  var files = fs.readdirSync('./assets/');
  for (var i = files.length - 1; i >= 0; i--) {
    var file = files[i];
    if (path.extname(file) == '.js' || path.extname(file) == '.css') {
      fs.unlinkSync('./assets/' + file);
    }
  };

  // Using UglifyJS for JS
  new compressor.minify({
    type: windows ? 'uglifyjs' : 'gcc',
    fileIn: [
      'assets/js/prettify.js', 
      'assets/js/app.js'
    ],
    fileOut: 'assets/' + config.version + '.js',
    callback: function(err){
      if (err) {
        console.log('Error minifying javascript.')
        console.log(err);
      }
    }
  });

  // Using Sqwish for CSS
  new compressor.minify({
    type: 'sqwish',
    fileIn: [
      'assets/css/bootstrap.min.css', 
      'assets/css/style.css'
    ],
    fileOut: './assets/' + config.version + '.css',
    callback: function(err){
      if (err) {
        console.log('Error minifying css.')
        console.log(err);
      }
    }
  });
});

desc("Build")
task('build', function() {
  console.log('Setting config version.')
  setConfigValue('version', config.version);

  //if (windows) {
  //  spawn('C:/Ruby193/bin/jekyll.bat', [], { stdio: 'inherit' });
  //} else {
  //  console.log("TODO: SETUP OS X")
  //}
});



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