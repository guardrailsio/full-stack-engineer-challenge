const tap = require("tap");
const {
  get,
  post,
  validate,
  iterators,
  generators,
  findingsTypeChecker,
} = require("../routes/results");
const {
  patterns,
  matches,
  status,
  clocker,
} = require("../utilities/validation");

tap.ok(get(), "get() works with no parameters");

tap.test(validate(get()), "get() returns valid types");

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

tap.test("validate() returns valid types", t => {
  validate(generators.valid);
  t.end();
});

tap.ok(iterators.findings(), "iterators.findings() works with no parameters");

tap.ok(
  iterators.findings({
    findings: [
      {
        ruleId: matches.ruleId,
        metadata: {
          description: matches.punctuation,
          severity: matches.underscore,
        },
        location: {
          path: matches.path,
          positions: {
            [matches.underscore]: {
              line: 60,
            },
          },
        },
      },
    ],
    findingsTypeChecker,
  }),
  "iterator.findings() works with valid types"
);

tap.ok(
  iterators.findings({ findings: [true, true] }, tap.ok),
  "iterator.findings() runs a command for each finding"
);

tap.ok(
  iterators.findings({ findings: ["params", "params"] }, tap.match, [/params/]),
  "iterator.findings() expands parameters"
);

tap.ok(iterators.positions(), "iterators.positions() works with no parameters");

tap.ok(
  iterators.findings({
    findings: [
      {
        ruleId: matches.ruleId,
        metadata: {
          description: matches.punctuation,
          severity: matches.underscore,
        },
        location: {
          path: matches.path,
          positions: {
            [matches.underscore]: {
              line: 60,
            },
          },
        },
      },
    ],
    findingsTypeChecker,
  }),
  "iterator.positions() works with valid types"
);

tap.ok(
  iterators.positions(
    { location: { positions: { begin: { line: true }, end: { line: true } } } },
    tap.ok,
    tap.ok
  ),
  "iterator.positions() runs a command for each position[index].line"
);

tap.ok(
  iterators.positions(
    { location: { positions: { begin: { line: 1 }, end: { line: 1 } } } },
    tap.match,
    tap.match,
    [/1/],
    [/begin|end/]
  ),
  "iterator.positions() expands parameters"
);
