const { whitelist } = require("../../utilities/frp");

const factory = {
  build: (key, ...params) => whitelist(key, params),
  return: (key, ...params) => whitelist(key, params)[key],
  append: {
    // {...factory.create(), ...result, result.findings[index].location
    finding: result => {},
    location: (result, index) => {},
    metadata: (result, index) => {},
    position: (result, index) => {},
    date: () => {},
  },
  create: () =>
    // build empty,
    // allows appends to avoid erroring out on missing property
    // @TODO: clean this up, nothing wrong with returning an object with default parameters, methods and mix-ins. Fractal directory structure as required.
    factory.return(
      "result",
      { id: "" },
      { status: "" },
      { repo: "" },
      {
        findings: [
          factory.return(
            "findings",
            { type: "" },
            { ruleId: "" },
            factory.build(
              "location",
              { path: "" },
              factory.build("positions", {})
            ),
            factory.build("metadata", { description: "" }, { severity: "" })
          ),
        ],
      }
    ),
  valid: {
    double: {
      id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      status: "Success",
      repo: "test",
      findings: [
        {
          type: "sast",
          ruleId: "G402",
          location: {
            path: "connectors/apigateway.go",
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: "TLS InsecureSkipVerify set true.",
            severity: "HIGH",
          },
        },
        {
          type: "sast",
          ruleId: "G404",
          location: {
            path: "util/util.go",
            positions: {
              begin: {
                line: 32,
              },
            },
          },
          metadata: {
            description:
              "Use of weak random number generator (math/rand instead of crypto/rand)",
            severity: "HIGH",
          },
        },
      ],
      queuedAt: 1573244611,
      scanningAt: 1573244621,
      finishedAt: 1573244631,
    },
    single: {
      id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      status: "Success",
      repo: "test",
      findings: [
        {
          type: "sast",
          ruleId: "G402",
          location: {
            path: "connectors/apigateway.go",
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: "TLS InsecureSkipVerify set true.",
            severity: "HIGH",
          },
        },
      ],
      queuedAt: 1573244611,
      scanningAt: 1573244621,
      finishedAt: 1573244631,
    },
    noDate: {
      id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      status: "Success",
      repo: "test",
      findings: [
        {
          type: "sast",
          ruleId: "G402",
          location: {
            path: "connectors/apigateway.go",
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: "TLS InsecureSkipVerify set true.",
            severity: "HIGH",
          },
        },
      ],
    },
  },
};

module.exports = { factory };
