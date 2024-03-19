const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
	translateAtoB(text) {
		let translation = text;
		for (let key in americanOnly) {
			translation = translation.replaceAll(key, americanOnly[key]);
		}

		for (let key in americanToBritishSpelling) {
			translation = translation.replaceAll(
				key,
				americanToBritishSpelling[key]
			);
		}
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = key;
			const regex = new RegExp(pattern, "gi");

			let title = americanToBritishTitles[key];
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = americanToBritishTitles[key].substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		return translation;
	}
	translateBtoA(text) {
		let translation = text;
		for (let key in britishOnly) {
			translation = translation.replaceAll(key, britishOnly[key]);
		}
		for (let key in americanToBritishSpelling) {
			translation = translation.replaceAll(
				americanToBritishSpelling[key], // reverse the direction of translation
				key
			);
		}
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = americanToBritishTitles[key];
			const regex = new RegExp(pattern, "gi");

			let title = key;
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = key.substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		return translation;
	}
}

module.exports = Translator;
