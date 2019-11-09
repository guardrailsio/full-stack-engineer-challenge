const tap = require("tap");
const { get, post, validate, iterators } = require("../routes/results");
const { patterns, matches, status } = require("../utilities/validation");

const typeCheck = result => {
  tap.match(result.id, patterns.RFC4122, "id is GUID");
  tap.ok(status.includes(result.status), "status is in range");
  tap.match(result.repo, patterns.github, "repo is valid github slug");
  timestampCheck(result.queuedAt, "queuedAt");
  timestampCheck(result.scanningAt, "scanningAt");
  timestampCheck(result.finishedAt, "finishedAt");
  result.findings.forEach(finding => findingCheck(finding));
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
  tap.match(
    Object.keys(finding.location.positions).forEach(index => {
      const position = finding.location.positions[index];
      tap.ok(Number.isInteger(position.line));
      tap.match(
        index,
        patterns.underscore(12),
        "finding.location.position label matches validation.patterns.underscore(12)"
      );
    })
  );
};

const timestampCheck = (timestamp, label) => {
  tap.ok(new Date(timestamp).getTime() > 0, `${label} is valid timestamp`);
  tap.ok(
    timestamp > Date.now() / 1000 - 3 * 365 * 24 * 60 * 60,
    `${label} is less than 3 years old`
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
