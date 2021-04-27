var YouTube = require('.\\node_modules\\youtube-node');
//var config = require('./config');

var youTube = new YouTube();
var myArgs = process.argv.slice(2);

youTube.setKey('AIzaSyAke-i0giY3V7Bs-iEQiA6UZIkCSj89v84');
youTube.search(myArgs[0], 2, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
  }
});
