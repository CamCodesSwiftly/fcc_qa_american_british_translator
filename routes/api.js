"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
	const translator = new Translator();

	app.route("/api/translate").post((req, res) => {
		let text = req.body.text;
		let locale = req.body.locale;

		// text or locale missing?
		if (
			req.body.text === "undefined" ||
			!req.body.hasOwnProperty("text") ||
			locale === "undefined" ||
			!locale
		) {
			return res.json({ error: "Required field(s) missing" });
		}

		// text empty?
		if (text.trim().length === 0 || text.trim() === "") {
			return res.json({ error: "No text to translate" });
		}

		// translate according to locale
		let translation;
		if (locale === "american-to-british") {
			translation = translator.translateAtoB(text);
		} else if (locale === "british-to-american") {
			translation = translator.translateBtoA(text);
		} else {
			// invalid locale?
			return res.json({ error: "Invalid value for locale field" });
		}

		// no translation necessary?
		if (text === translation) {
			return res.json({
				text: text,
				translation: "Everything looks good to me!",
			});
		}

		// all valid, translate normally
		res.json({
			text: text,
			translation: translation,
		});
	});
};
