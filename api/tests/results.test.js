const tap = require("tap");
const { get, post } = require("../routes/results");
const { validate } = require("../routes/results/validate");

tap.ok(get(), "get() works with no parameters");

tap.ok(validate(get()), "get() returns valid types");

tap.test("get(:id) returns record with matching id", t => {
  const result = get("2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  validate(result);
  t.equals(result.id, "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  t.end();
});

tap.ok("works with no parameters", post());

tap.test("post() returns valid types", t => {
  validate(post());
  t.end();
});
