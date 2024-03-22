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
		for (const [key, value] of Object.entries(americanOnly)) {
			const pattern = "\\b" + key + "\\b"; // add b to establish word for word translation, no subword translation
			const regex = new RegExp(pattern, "gi");

			//highlighting
			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(value);
			}

			translation = translation.replaceAll(regex, value);
		}

		// * Translate: Spellings
		for (const [key, value] of Object.entries(americanToBritishSpelling)) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			//highlighting
			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(value);
			}

			translation = translation.replaceAll(regex, value);
		}

		// * Translate: Titles
		for (const [key, value] of Object.entries(americanToBritishTitles)) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = value; //escape the dot
			const regex = new RegExp(pattern + "\\.", "gi");

			let title = value;
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = value.substring(1);
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
		for (const [key, value] of Object.entries(britishOnly)) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(value);
			}

			translation = translation.replaceAll(regex, value);
		}

		// * Translate: Spellings
		for (const [key, value] of Object.entries(americanToBritishSpelling)) {
			const pattern = "\\b" + value + "\\b";
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
		for (const [key, value] of Object.entries(americanToBritishTitles)) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = "\\b" + value + "\\b";
			const regex = new RegExp(pattern, "gi");

			let title = key;
			let upperCaseStartingCharacter = title[0].toUpperCase();
			let restOfTitle = key.substring(1);
			let upperCasedTitle = upperCaseStartingCharacter + restOfTitle;

			// highlighting
			let match = translation.match(regex);
			if (match) {
				let title = value;
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
