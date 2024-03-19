const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
	translateAtoB(text) {
		let translation = text;
		for (let key in americanOnly) {
			const pattern = "\\b" + key + "\\b"; // add b to establish word for word translation, no subword translation
			const regex = new RegExp(pattern, "gi");
			translation = translation.replaceAll(regex, americanOnly[key]);
		}

		for (let key in americanToBritishSpelling) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");
			translation = translation.replaceAll(
				regex,
				americanToBritishSpelling[key]
			);
		}
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			// const pattern = "\\b" + key + "";
			const pattern = key;
			const regex = new RegExp(pattern, "gi");

			let title = americanToBritishTitles[key];
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = americanToBritishTitles[key].substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		// change time notation from : to .
		const timeRegex = /(?<=\d{1})\:(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ".");

		return translation;
	}

	translateBtoA(text) {
		let translation = text;

		let previousKey = null;
		let previousValue = null;
		let previousTranslation = null;
		for (let key in britishOnly) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			// if (
			// 	text === "I had a bicky then went to the chippy." &&
			// 	britishOnly[key] === "cookie"
			// ) {
			// 	if (previousValue === britishOnly[key]) {
			// 		console.log(previousKey + " . " + previousValue);
			// 		console.log(key + " - " + britishOnly[key]);
			// 		console.log(translation);
			// 		console.log(previousTranslation);
			// 		if (translation != previousTranslation) {
			// 			console.log("translations are not equal");
			// 		}
			// 		console.log("-----------------");
			// 	}
			// }
			// dont translate the same thing twice
			if (previousValue === britishOnly[key] && translation != previousTranslation) {
				// console.log("where do you actually skip?");
				previousValue = britishOnly[key];
				previousKey = key;
				continue;
			}
			previousTranslation = translation;
			translation = translation.replaceAll(regex, britishOnly[key]);
			previousValue = britishOnly[key];
			previousKey = key;
		}
		for (let key in americanToBritishSpelling) {
			const pattern = "\\b" + americanToBritishSpelling[key] + "\\b";
			const regex = new RegExp(pattern, "gi");

			translation = translation.replaceAll(
				regex, // reverse the direction of translation
				key
			);
		}
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = "\\b" + americanToBritishTitles[key] + "\\b";
			const regex = new RegExp(pattern, "gi");

			let title = key;
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = key.substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;
			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		// change time notation from . to :
		const timeRegex = /(?<=\d{1})\.(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ":");

		return translation;
	}
}

module.exports = Translator;
