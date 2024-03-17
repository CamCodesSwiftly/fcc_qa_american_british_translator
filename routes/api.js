"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
	const translator = new Translator();

	app.route("/api/translate").post((req, res) => {
		let text = req.body.text;
		let locale = req.body.locale;

		let translation = translator.translateAtoB(text);
		console.log(translation);
	});
};
