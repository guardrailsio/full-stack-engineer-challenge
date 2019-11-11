const tap = require("tap");
const { validate } = require("../../routes/results/validate");
const { factory } = require("../../routes/results/factory");

tap.test("validate() returns valid types", t => {
  validate(factory.valid.single);
  t.end();
});
