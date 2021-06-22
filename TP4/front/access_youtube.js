// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
	let loc = clickedLat.toString() + "," + clickedLong.toString();
	return gapi.client.youtube.search
		.list({
			part: ["snippet"],
			location: loc,
			locationRadius: x + "m",
			type: ["video"],
		})
		.then(
			function (response) {
				// Handle the results here (response.result has the parsed body).
				console.log("Response", response);
				let res_json = JSON.parse(response.body);
				let element = document.getElementById("res");
				while (element.firstChild) element.removeChild(element.firstChild);
				for (let i = 0; i < res_json["items"].length; i++) {
					let para = document.createElement("div");
					// image
					let img = document.createElement("img");
					let att = document.createAttribute("src");
					att.value = res_json["items"][i]["snippet"]["thumbnails"]["default"]["url"];
					img.setAttributeNode(att);
					para.appendChild(img);

					let content = document.createElement("div");
					// title
					let title = document.createElement("p");
					let text = document.createTextNode(res_json["items"][i]["snippet"]["title"]);
					title.appendChild(text);
					content.appendChild(title);
					// description
					let desc = document.createElement("p");
					text = document.createTextNode(res_json["items"][i]["snippet"]["description"]);
					desc.appendChild(text);
					content.appendChild(desc);
					para.appendChild(content);

					// link
					let link = document.createElement("a");
					att = document.createAttribute("href");
					att.value = "https://youtu.be/" + res_json["items"][i]["id"]["videoId"];
					link.setAttributeNode(att);
					att = document.createAttribute("target");
					att.value = "_blank";
					link.setAttributeNode(att);
					link.appendChild(para);
					element.appendChild(link);
				}
			},
			function (err) {
				console.error("Execute error", err);
			}
		);
}

gapi.load("client:auth2", function () {
	gapi.auth2.init();
});
