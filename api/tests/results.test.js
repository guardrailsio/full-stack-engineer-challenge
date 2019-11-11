const tap = require("tap");
const {
  get,
  post,
  validate,
  iterators,
  factory,
  findingsTypeChecker,
} = require("../routes/results");
const { matches } = require("../utilities/validation");

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

tap.test("validate() returns valid types", t => {
  validate(factory.valid.single);
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

tap.same(
  factory.build("result", { id: "1" }, { status: "Success" }, { repo: "test" }),
  { result: { id: "1", status: "Success", repo: "test" } }
);

tap.same(factory.build("findings", { type: "sast" }, { ruleId: "G402" }), {
  findings: { type: "sast", ruleId: "G402" },
});

tap.same(factory.build("location", { path: "connectors/apigateway.go" }), {
  location: { path: "connectors/apigateway.go" },
});

tap.same(
  factory.build("positions", { begin: { line: 60 } }, { end: { line: 59 } }),
  {
    positions: { begin: { line: 60 }, end: { line: 59 } },
  }
);

tap.same(
  factory.build(
    "metadata",
    { description: "TLS InsecureSkipVerify set true." },
    { severity: "HIGH" }
  ),
  {
    metadata: {
      description: "TLS InsecureSkipVerify set true.",
      severity: "HIGH",
    },
  }
);

tap.same(
  factory.build(
    "location",
    { path: "connectors/apigateway.go" },
    factory.build("positions", { begin: { line: 60 } }, { end: { line: 59 } })
  ),
  {
    location: {
      path: "connectors/apigateway.go",
      ...factory.build(
        "positions",
        { begin: { line: 60 } },
        { end: { line: 59 } }
      ),
    },
  },
  "positions build into location"
);

tap.same(
  factory.return(
    "result",
    { id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d" },
    { status: "Success" },
    { repo: "test" },
    {
      findings: [
        factory.return(
          "findings",
          { type: "sast" },
          { ruleId: "G402" },
          factory.build(
            "location",
            { path: "connectors/apigateway.go" },
            factory.build("positions", { begin: { line: 60 } })
          ),
          factory.build(
            "metadata",
            { description: "TLS InsecureSkipVerify set true." },
            { severity: "HIGH" }
          )
        ),
      ],
    }
  ),
  factory.valid.noDate,
  "result full builds"
);
