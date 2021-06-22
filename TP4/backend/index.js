const express = require("express");
const bodyParser = require("body-parser");
var Twitter = require("twitter");
var client = new Twitter({
	consumer_key: "",
	consumer_secret: "",
	bearer_token:
		"",
});
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
app.use(bodyParser.json());
app.post("/rest/recherche", async (req, res) => {
	console.log(req.body);
	var geocode;
	var count;
	var query;
	if (req.body.query == null) {
		query = "#EURO2020";
	} else {
		query = req.body.query;
	}
	if (req.body.geocode == null) {
		geocode = "43.3,5.4,10km";
	} else {
		geocode = req.body.geocode;
	}
	if (req.body.count == null) {
		count = "15";
	} else {
		count = req.body.count;
	}
	client.get(
		"search/tweets",
		{ q: query, geocode: geocode, count: count },
		function (error, tweets, response) {
			if (error) {
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).json(tweets.statuses);
		}
	);
});

app.get("/rest/trends/:id_zone", (req, res) => {
	const idZone = req.params.id_zone;
	client.get("trends/place", { id: idZone }, function (error, trends, response) {
		if (error) {
			console.log(err);
			res.status(400).send(err);
		}
		res.status(200).json(trends[0].trends.slice(0, 5));
		//console.log(trends[0].trends.slice(0, 5));
	});
});

https: module.exports = app;
