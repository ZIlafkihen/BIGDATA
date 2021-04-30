const YouTube = require("youtube-node");
const express = require("express");

const app = express();
var youTube = new YouTube();

connection.connect();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.get("/", (req, res, next) => {
	res.status(200).json({ Message: "Hello world" });
});

app.get("/test", (req, res, next) => {
	const bidon = {
		nom: "Jesuis",
		Prenom: "Bidon",
	};
	res.status(200).json(bidon);
});

module.exports = app;
