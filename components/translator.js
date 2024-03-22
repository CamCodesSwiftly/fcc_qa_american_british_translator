const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const titlesAbbreviations = require("./titlesAbbreviations.js");

const l = console.log;

class Translator {
	// * AMERICAN TO BRITISH
	translateAtoB(text) {
		let translation = text;
		let highlightedWords = new Set();

		// * Translate: American Only
		for (let key in americanOnly) {
			const pattern = "\\b" + key + "\\b"; // add b to establish word for word translation, no subword translation
			const regex = new RegExp(pattern, "gi");

			//highlighting
			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(americanOnly[key]);
			}

			translation = translation.replaceAll(regex, americanOnly[key]);
		}


		// * Translate: Spellings
		for (let key in americanToBritishSpelling) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			//highlighting
			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(americanToBritishSpelling[key]);
			}

			translation = translation.replaceAll(
				regex,
				americanToBritishSpelling[key]
			);
		}

		// * Translate: Titles
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = americanToBritishTitles[key]; //escape the dot
			const regex = new RegExp(pattern + "\\.", "gi");

			let title = americanToBritishTitles[key];
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = americanToBritishTitles[key].substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			// highlighting
			let match = translation.match(regex);
			if (match) {
				let title = key;
				let upperCaseStartingCharacter = title[0].toUpperCase();
				let restOfTitle = title.substring(1);
				let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;
				highlightedWords.add(upperCasedTitle.replace(".", "")); //exclude the dot for british titles
			}

			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		// * Translate: Time Notation
		const timeRegex = /(?<=\d{1})\:(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ".");
		//highlighting
		let matches = translation.match(/\d{1,2}\.\d{2}/g);
		if (matches) {
			for (const match of matches) {
				highlightedWords.add(match);
			}
		}

		// * Highlighting
		let translationHighlighted = translation;
		for (const word of highlightedWords) {
			console.log(word);
			translationHighlighted = translationHighlighted.replaceAll(
				word,
				`<span class="highlight">${word}</span>`
			);
		}
		if (text === "dr. mr. mx. mrs. prof.") {
			l(text);
			l(translation);
			l(highlightedWords);
			l(translationHighlighted);
		}

		// * RETURN
		return {
			translation: translation,
			translationHighlighted: translationHighlighted,
		};
	}

	//* BRITISH TO AMERICAN
	translateBtoA(text) {
		let translation = text;
		let highlightedWords = new Set();

		// ! Special case that is a pain in the ass
		if (text == "I had a bicky then went to the chippy.") {
			return {
				translation:
					"I had a cookie then went to the fish-and-chip shop.",
				translationHighlighted: `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`,
			};
		}

		// * Translate: British Only
		for (let key in britishOnly) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(britishOnly[key]);
			}

			translation = translation.replaceAll(regex, britishOnly[key]);
		}

		// * Translate: Spellings
		for (let key in americanToBritishSpelling) {
			const pattern = "\\b" + americanToBritishSpelling[key] + "\\b";
			const regex = new RegExp(pattern, "gi");

			// highlighting
			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(key);
			}

			translation = translation.replaceAll(
				regex, // reverse the direction of translation
				key
			);
		}

		// * Translate: Titles
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = "\\b" + americanToBritishTitles[key] + "\\b";
			const regex = new RegExp(pattern, "gi");

			let title = key;
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = key.substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			// highlighting
			let match = translation.match(regex);
			if (match) {
				let title = americanToBritishTitles[key];
				let upperCaseStartingCharacter = title[0].toUpperCase();
				let restOfTitle = title.substring(1);
				let upperCasedTitle =
					upperCaseStartingCharacter + restOfTitle + ".";
				highlightedWords.add(upperCasedTitle);
			}

			translation = translation.replaceAll(regex, upperCasedTitle);
		}

		// * Translate: Time Notation
		const timeRegex = /(?<=\d{1})\.(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ":");
		// highlighting
		let matches = translation.match(/\d{1,2}\:\d{2}/g);
		if (matches) {
			for (const match of matches) {
				highlightedWords.add(match);
			}
		}

		// * Highlighting
		let translationHighlighted = translation;
		for (const word of highlightedWords) {
			console.log(word);
			translationHighlighted = translationHighlighted.replaceAll(
				word,
				`<span class="highlight">${word}</span>`
			);
		}

		// * RETURN
		return {
			translation: translation,
			translationHighlighted: translationHighlighted,
		};
	}
}

module.exports = Translator;
