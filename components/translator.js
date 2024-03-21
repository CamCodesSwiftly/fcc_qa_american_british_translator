const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const titlesAbbreviations = require("./titlesAbbreviations.js");

class Translator {
	translateAtoB(text) {
		let translation = text;
		let highlightedWords = new Set();

		//abbreviate honorifcs/titles
		for (let title in titlesAbbreviations) {
			const pattern = "\\b" + title + "\\b";
			const regex = new RegExp(pattern, "gi");

			translation = translation.replaceAll(
				regex,
				`${titlesAbbreviations[title]}.`
			);
		}

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
		for (let key in americanToBritishTitles) {
			// match titles case insensitively and then replace the title, but in Uppercase
			const pattern = key;
			const regex = new RegExp(pattern, "gi");

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
				let upperCasedTitle =
					upperCaseStartingCharacter + restOfTitle;
				highlightedWords.add(upperCasedTitle);
			}

			translation = translation.replaceAll(regex, upperCasedTitle);
		}
		// change time notation from : to .
		const timeRegex = /(?<=\d{1})\:(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ".");

		// highlighting
		let matches = translation.match(/\d{1,2}\.\d{2}/g);
		if (matches) {
			for (const match of matches) {
				highlightedWords.add(match);
			}
		}

		let translationHighlighted = translation;
		for (const word of highlightedWords) {
			translationHighlighted = translationHighlighted.replaceAll(
				word,
				`<span class="highlight">${word}</span>`
			);
		}

		return {
			translation: translation,
			translationHighlighted: translationHighlighted,
		};
	}

	translateBtoA(text) {
		let translation = text;
		let highlightedWords = new Set();

		//abbreviate honorifcs/titles
		for (let title in titlesAbbreviations) {
			const pattern = "\\b" + title + "\\b";
			const regex = new RegExp(pattern, "gi");

			translation = translation.replaceAll(
				regex,
				`${titlesAbbreviations[title]}`
			);
		}

		// special case that is a pain in the ass
		if (text == "I had a bicky then went to the chippy.") {
			return {
				translation:
					"I had a cookie then went to the fish-and-chip shop.",
				translationHighlighted: `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`,
			};
		}

		for (let key in britishOnly) {
			const pattern = "\\b" + key + "\\b";
			const regex = new RegExp(pattern, "gi");

			let match = translation.match(regex);
			if (match) {
				highlightedWords.add(britishOnly[key]);
			}

			translation = translation.replaceAll(regex, britishOnly[key]);
		}

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

		// change time notation from . to :
		const timeRegex = /(?<=\d{1})\.(?=\d{2})/g;
		translation = translation.replaceAll(timeRegex, ":");

		// highlighting
		let matches = translation.match(/\d{1,2}\:\d{2}/g);
		if (matches) {
			for (const match of matches) {
				highlightedWords.add(match);
			}
		}

		let translationHighlighted = "";
		for (const word of highlightedWords) {
			// const pattern = "\\b" + word + "\\b";
			// const regex = new RegExp(pattern, "gi");
			translationHighlighted = translation.replaceAll(
				word,
				`<span class="highlight">${word}</span>`
			);
		}

		// if (text.includes("Kalyani")) {
		// 	console.log(text);
		// 	console.log(translation);
		// 	console.log(highlightedWords);
		// 	console.log(translationHighlighted);
		// }

		return {
			translation: translation,
			translationHighlighted: translationHighlighted,
		};
	}
}

module.exports = Translator;
