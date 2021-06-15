var YouTube = require("youtube-node");

let videoArray = [];
let resultatJson;
let query = "";
var youTube = new YouTube();
var myArgs = process.argv.slice(2);
let mysql = require("mysql");
let connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "YOUTUBE",
});
connection.connect();

youTube.setKey("AIzaSyAke-i0giY3V7Bs-iEQiA6UZIkCSj89v84");
youTube.search(myArgs[0], 10, function (error, result) {
	if (error) {
		console.log(error);
	} else {
		resultQuery = JSON.stringify(result, null, 2);
		let obj = JSON.parse(resultQuery);
		resultatJson = obj;
		console.log(obj.items);
		videoArray.push(obj.items);
		insertIntoDb(obj);
	}
});

function insertIntoDb(obj) {
	for (let item of obj.items) {
		query =
			"INSERT INTO video VALUES (" +
			"'" +
			item.id.videoId +
			"'" +
			" ," +
			"'" +
			item.snippet.publishedAt +
			"'" +
			" ," +
			"'" +
			item.snippet.channelId +
			"'" +
			" ," +
			"'" +
			item.snippet.title +
			"'" +
			" ," +
			"'" +
			item.snippet.description.replace(/'/g, "quote") +
			"'" +
			" ," +
			"'" +
			item.snippet.channelTitle +
			"'" +
			") ;";
		connection.query(query, function (error, results, fields) {
			if (error) throw error;
			console.log("Data inserted");
		});
	}
	closeConnection();
}
function closeConnection() {
	connection.end();
}

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
	if (error) throw error;
	console.log("The solution is: ", results[0].solution);
});
