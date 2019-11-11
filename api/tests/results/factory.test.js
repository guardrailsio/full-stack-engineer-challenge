const tap = require("tap");
const { factory, createResult } = require("../../routes/results/factory");

// builds with no data
tap.ok(createResult());
// builds with valid data
tap.test("Result factory valid", t => {
  // @TODO: make this into it's own function. Instead of passing around objects as mocks, want to do some transforms
  // like, test UTF, or test empty findings,
  const result = createResult();
  result.id = "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d";
  result.status = "Success";
  result.repo = "test";
  result.findings[0].type = "sast";
  result.findings[0].ruleId = "G402";
  result.findings[0].location.path = "connectors/apigateway.go";
  result.findings[0].location.positions.begin = { line: 60 };
  result.findings[0].metadata.description = "TLS InsecureSkipVerify set true.";
  result.findings[0].metadata.severity = "HIGH";
  console.log(result);
  t.end();
});

// builds valid with invalid data

// builds nested

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
