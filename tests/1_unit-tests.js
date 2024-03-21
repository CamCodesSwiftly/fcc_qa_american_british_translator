const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
let translator = new Translator();

suite("Unit Tests", () => {
	suite("American To British", () => {
		//#1
		test("#mangoes", () => {
			let text = "Mangoes are my favorite fruit.";
			let translation = "Mangoes are my favourite fruit.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#2
		test("#yogurt", () => {
			let text = "I ate yogurt for breakfast.";
			let translation = "I ate yoghurt for breakfast.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#3
		test("#party", () => {
			let text = "We had a party at my friend's condo.";
			let translation = "We had a party at my friend's flat.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#4
		test("#trashcan", () => {
			let text = "Can you toss this in the trashcan for me?";
			let translation = "Can you toss this in the bin for me?";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#5
		test("#parking lot", () => {
			let text = "The parking lot was full.";
			let translation = "The car park was full.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#6
		test("#rube goldberg", () => {
			let text = "Like a high tech Rube Goldberg machine.";
			let translation = "Like a high tech Heath Robinson device.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#7
		test("#hooky", () => {
			let text = "To play hooky means to skip class or work.";
			let translation = "To bunk off means to skip class or work.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#8
		test("#jamesbond", () => {
			let text = "No Mr. Bond, I expect you to die.";
			let translation = "No Mr Bond, I expect you to die.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		// #9
		test("#drgosh", () => {
			let text = "Dr. Grosh will see you now.";
			let translation = "Dr Grosh will see you now.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
		//#10
		test("#lunchtime", () => {
			let text = "Lunch is at 12:15 today.";
			let translation = "Lunch is at 12.15 today.";
			assert.strictEqual(
				translator.translateAtoB(text).translation,
				translation
			);
		});
	});
	suite("British To English", () => {
		//#11
		test("#footiematch", () => {
			let text = "We watched the footie match for a while.";
			let translation = "We watched the soccer match for a while.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#12
		test("#paracetamol", () => {
			let text = "Paracetamol takes up to an hour to work.";
			let translation = "Tylenol takes up to an hour to work.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#13
		test("#caramelise", () => {
			let text = "First, caramelise the onions.";
			let translation = "First, caramelize the onions.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#14
		test("#funfair", () => {
			let text = "I spent the bank holiday at the funfair.";
			let translation = "I spent the public holiday at the carnival.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//TODO: #15 "Zwischentranslating" könnte ein Problem sein
		test("#bickychippy", () => {
			let text = "I had a bicky then went to the chippy.";
			let translation =
				"I had a cookie then went to the fish-and-chip shop.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#16
		test("#bitsbobs", () => {
			let text = "I've just got bits and bobs in my bum bag.";
			let translation = "I've just got odds and ends in my fanny pack.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#17
		test("#boxtedairfield", () => {
			let text = "The car boot sale at Boxted Airfield was called off.";
			let translation =
				"The swap meet at Boxted Airfield was called off.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#18
		test("#mrskalyani", () => {
			let text = "Have you met Mrs Kalyani?";
			let translation = "Have you met Mrs. Kalyani?";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		//#19
		test("#ProfJoyner", () => {
			let text = "Prof Joyner of King's College, London.";
			let translation = "Prof. Joyner of King's College, London.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
		// #20
		test("#teatime", () => {
			let text = "Tea time is usually around 4 or 4.30.";
			let translation = "Tea time is usually around 4 or 4:30.";
			assert.strictEqual(
				translator.translateBtoA(text).translation,
				translation
			);
		});
	});
	suite("Highlighting", () => {
		//#1
		test("#highlightfavorite", () => {
			let text = "Mangoes are my favorite fruit.";
			let translationHighlighted = `Mangoes are my <span class="highlight">favourite</span> fruit.`;
			assert.strictEqual(
				translator.translateAtoB(text).translationHighlighted,
				translationHighlighted
			);
		});
		//#2
		test("#highlightyogurt", () => {
			let text = "I ate yogurt for breakfast.";
			let translationHighlighted = `I ate <span class="highlight">yoghurt</span> for breakfast.`;
			assert.strictEqual(
				translator.translateAtoB(text).translationHighlighted,
				translationHighlighted
			);
		});
		//#3
		test("#highlightfootie", () => {
			let text = "We watched the footie match for a while.";
			let translationHighlighted = `We watched the <span class="highlight">soccer</span> match for a while.`;
			assert.strictEqual(
				translator.translateBtoA(text).translationHighlighted,
				translationHighlighted
			);
		});
		//#4
		test("#highlightparacetamol", () => {
			let text = "Paracetamol takes up to an hour to work.";
			let translationHighlighted = `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
			assert.strictEqual(
				translator.translateBtoA(text).translationHighlighted,
				translationHighlighted
			);
		});
	});
});
