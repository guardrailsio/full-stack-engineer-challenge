const tap = require("tap");
const { get, post, validate, iterators } = require("../routes/results");
const {
  patterns,
  matches,
  status,
  clocker,
} = require("../utilities/validation");

const typeCheck = result => {
  tap.match(result.id, patterns.RFC4122, "id is GUID");
  tap.ok(status.includes(result.status), "status is in range");
  tap.match(result.repo, patterns.github, "repo is valid github slug");
  tap.ok(
    clocker(result.queuedAt),
    "queuedAt greater than retention and not in the future"
  );
  tap.ok(
    clocker(result.scanningAt),
    "scanningAt greater than retention and not in the future"
  );
  tap.ok(
    clocker(result.finishedAt),
    "finishedAt greater than retention and not in the future"
  );
  iterators.findings(result, findingCheck);
};

const findingCheck = finding => {
  tap.match(
    finding.ruleId,
    patterns.ruleId,
    "finding.ruleId matches validation.patterns.ruleId"
  );
  tap.match(
    finding.metadata.description,
    patterns.punctuation(100),
    "finding.metadata.description matches validation.patterns.punctuation(100)"
  );
  tap.match(
    finding.metadata.severity,
    patterns.underscore(12),
    "finding.metadata.severity matches validation.patterns.underscore(12)"
  );
  tap.match(
    finding.location.path,
    patterns.path(30),
    "finding.location.path matches validation.patterns.path(30)"
  );
  iterators.positions(
    finding,
    line => tap.ok(Number.isInteger(line)),
    tap.match,
    [],
    [
      patterns.underscore(12),
      "finding.location.position label matches validation.patterns.underscore(12)",
    ]
  );
};

tap.ok(get(), "get() works with no parameters");

tap.test("get() returns valid types", t => {
  typeCheck(get());
  t.end();
});

tap.test("get(:id) returns record with matching id", t => {
  const result = get("2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  typeCheck(result);
  t.equals(result.id, "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  t.end();
});

tap.ok("works with no parameters", post());

tap.test("post() returns valid types", t => {
  typeCheck(post());
  t.end();
});

tap.ok(validate(), "validate() works with no parameters");

tap.test("validate() returns valid types", t => {
  typeCheck(validate());
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
    findingCheck,
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
    findingCheck,
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
