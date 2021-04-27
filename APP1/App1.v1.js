var YouTube = require("youtube-node");
var youTube = new YouTube();

youTube.setKey("AIzaSyAke-i0giY3V7Bs-iEQiA6UZIkCSj89v84");
youTube.search("World War z Trailer", 2, function (error, result) {
	if (error) {
		console.log(error);
	} else {
		console.log(JSON.stringify(result, null, 2));
	}
});
