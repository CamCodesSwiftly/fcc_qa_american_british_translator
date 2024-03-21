const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
	test("#1 valid text valid locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				text: "Mangoes are my favorite fruit.",
				locale: "american-to-british",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"text",
					"text property should exist in response"
				);
				assert.property(
					res.body,
					"translation",
					"translation property should exist in response"
				);

				assert.strictEqual(
					res.body.text,
					"Mangoes are my favorite fruit.",
					"text property must be exactly -Mangoes are my favorite fruit.-"
				);
				assert.strictEqual(
					res.body.translation,
					`Mangoes are my <span class="highlight">favourite</span> fruit.`,
					`Translation property must be exactly -Mangoes are my <span class="highlight">favourite</span> fruit.-`
				);
				done();
			});
	});
	test("#2 valid text invalid locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				text: "Mangoes are my favorite fruit.",
				locale: "french-to-turkish",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"error",
					"error property should exist in response"
				);

				assert.strictEqual(
					res.body.error,
					"Invalid value for locale field",
					"error property must be exactly -Invalid value for locale field-"
				);

				done();
			});
	});
	test("#3 missing text valid locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				locale: "american-to-british",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"error",
					"error property should exist in response"
				);

				assert.strictEqual(
					res.body.error,
					"Required field(s) missing",
					"error property must be exactly -Required field(s) missing-"
				);

				done();
			});
	});
	test("#4 valid text missing locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				text: "Mangoes are my favourite fruit.",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"error",
					"error property should exist in response"
				);

				assert.strictEqual(
					res.body.error,
					"Required field(s) missing",
					"error property must be exactly -Required field(s) missing-"
				);

				done();
			});
	});
	test("#5 empty text valid locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				text: "",
				locale: "american-to-british",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"error",
					"error property should exist in response"
				);

				assert.strictEqual(
					res.body.error,
					"No text to translate",
					"error property must be exactly -No text to translate-"
				);

				done();
			});
	});
	test("#6 text needs no translation valid locale", function (done) {
		chai.request(server)
			.post("/api/translate")
			.send({
				text: "American and british english are almost the same",
				locale: "american-to-british",
			})
			// Provide the desired query parameters
			.end(function (err, res) {
				assert.equal(err, null); // No error should occur
				assert.equal(res.status, 200);
				assert.property(
					res.body,
					"text",
					"text property should exist in response"
				);
				assert.property(
					res.body,
					"translation",
					"translation property should exist in response"
				);

				assert.strictEqual(
					res.body.text,
					"American and british english are almost the same",
					"text property must be exactly -American and british english are almost the same-"
				);

				assert.strictEqual(
					res.body.translation,
					"Everything looks good to me!",
					"translation property must be exactly -Everything looks good to me!-"
				);
				done();
			});
	});
});
