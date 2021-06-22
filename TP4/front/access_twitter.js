function execute() {
	//Création dynamique du formulaire

	var loc = clickedLat.toString() + "," + clickedLong.toString();

	if (x == 25000) {
		loc = loc + ",25km";
	}
	if (x == 10000) {
		loc = loc + ",10km";
	}
	if (x == 5000) {
		loc = loc + ",5km";
	}
	if (x == 1000) {
		loc = loc + ",1km";
	}

	const Http = new XMLHttpRequest();
	const url = "http://localhost:3000/rest/recherche";
	Http.open("POST", url);
	Http.setRequestHeader("Content-type", "application/json");
	Http.send(JSON.stringify({ query: y, count: z, geocode: loc }));

	Http.onreadystatechange = (e) => {
		let response = Http.responseText;
		//console.log(response);
		let res_json = JSON.parse(response);
		let element = document.getElementById("res");
		while (element.firstChild) element.removeChild(element.firstChild);
		//console.log(res_json.length);
		for (let i = 0; i < res_json.length; i++) {
			let para = document.createElement("div");
			let content = document.createElement("div");
			//user.name
			let title = document.createElement("h3");
			let text = document.createTextNode(
				res_json[i]["user"]["name"] + " (le  : " + new Date(res_json[i]["created_at"]) + ")"
			);
			title.appendChild(text);
			content.appendChild(title);
			//user.profile_image_url
			let img = document.createElement("img");
			let att = document.createAttribute("src");
			att.value = res_json[i]["user"]["profile_image_url"];
			img.setAttributeNode(att);
			para.appendChild(img);

			//text
			let desc = document.createElement("p");
			text = document.createTextNode(res_json[i]["text"]);
			desc.appendChild(text);
			content.appendChild(desc);

			//favorite_count
			let favorites = document.createElement("p");
			let att2 = document.createAttribute("class");
			att2.value = "rtandfav";
			favorites.setAttributeNode(att2);
			let number = document.createTextNode("FAVORIES : " + res_json[i]["favorite_count"]);
			favorites.appendChild(number);
			content.appendChild(favorites);

			//retweet_count
			let retweets = document.createElement("p");
			let att3 = document.createAttribute("class");
			att3.value = "rtandfav";
			retweets.setAttributeNode(att3);
			let numbertwo = document.createTextNode("RETWEETS : " + res_json[i]["retweet_count"]);
			retweets.appendChild(numbertwo);
			content.appendChild(retweets);
			para.appendChild(content);
			// link
			let link = document.createElement("a");
			att = document.createAttribute("href");
			att.value =
				"https://twitter.com/" +
				res_json[i]["user"]["screen_name"] +
				"/status/" +
				res_json[i]["id_str"];
			link.setAttributeNode(att);
			att = document.createAttribute("target");
			att.value = "_blank";
			link.setAttributeNode(att);
			link.appendChild(para);
			element.appendChild(link);
		}
	};
}

function trends() {
	const Http = new XMLHttpRequest();
	const url = "http://localhost:3000/rest/trends";
	Http.open("GET", url + "/" + id, true);
	Http.setRequestHeader("Content-type", "application/json");
	Http.send();
	Http.onreadystatechange = (e) => {
		let response = Http.responseText;
		//console.log(response);
		let res_json = JSON.parse(response);
		let element = document.getElementById("trends");
		while (element.firstChild) element.removeChild(element.firstChild);
		//console.log(res_json.length);
		for (let i = 0; i < res_json.length; i++) {
			let para = document.createElement("div");
			let content = document.createElement("div");
			//name
			let title = document.createElement("h3");
			let text = document.createTextNode(
				res_json[i]["name"] + " (Tweets  : " + res_json[i]["tweet_volume"] + ")"
			);
			title.appendChild(text);
			content.appendChild(title);
			para.appendChild(content);
			//link
			let link = document.createElement("a");
			att = document.createAttribute("href");
			att.value = res_json[i]["url"];
			link.setAttributeNode(att);
			att = document.createAttribute("target");
			att.value = "_blank";
			link.setAttributeNode(att);
			link.appendChild(para);
			element.appendChild(link);
		}
	};
}
