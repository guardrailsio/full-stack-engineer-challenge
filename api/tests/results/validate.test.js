const tap = require("tap");
const { validate } = require("../../routes/results/validate");
const { valid } = require("../../utilities/validation");

tap.test("validate() returns valid types", t => {
  validate(valid.single);
  t.end();
});
