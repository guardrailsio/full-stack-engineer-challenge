const assert = require("assert");
const { patterns, status, clocker } = require("../utilities/validation");
const { pipe, nest } = require("../utilities/frp");

const get = (id = false) => {
  return {
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
  };
};

const post = () => {
  return {
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
  };
};

const validate = (result, recover) => {
  return typeChecker(result);
};

const recovery = (result, error) => {
  try {
    // @TODO: also try running through factory
    return typeChecker(JSON.encode(JSON.stringify.replace(/\.\,\-\?\//, "")));
  } catch (recoveryError) {
    return fail(error.message);
  }
};

const typeChecker = result => {
  assert.ok(patterns.RFC4122.test(result.id), "id is GUID");
  assert.ok(status.includes(result.status), "status is in range");
  assert.ok(patterns.github.test(result.repo), "repo is valid github slug");
  assert.ok(
    clocker(result.queuedAt),
    "queuedAt greater than retention and not in the future"
  );
  assert.ok(
    clocker(result.scanningAt),
    "scanningAt greater than retention and not in the future"
  );
  assert.ok(
    clocker(result.finishedAt),
    "finishedAt greater than retention and not in the future"
  );
  iterators.findings(result, findingsTypeChecker);
  return true;
};

const findingsTypeChecker = finding => {
  assert.ok(
    patterns.ruleId.test(finding.ruleId),
    "finding.ruleId matches validation.patterns.ruleId"
  );
  assert.ok(
    patterns.punctuation(100).test(finding.metadata.description),
    "finding.metadata.description matches validation.patterns.punctuation(100)"
  );
  assert.ok(
    patterns.underscore(12).test(finding.metadata.severity),
    "finding.metadata.severity matches validation.patterns.underscore(12)"
  );
  assert.ok(
    patterns.path(30).test(finding.location.path),
    "finding.location.path matches validation.patterns.path(30)"
  );
  iterators.positions(
    finding,
    line => assert.ok(Number.isInteger(line)),
    index =>
      assert.ok(
        patterns.underscore(12).test(index),
        "finding.location.position label matches validation.patterns.underscore(12)"
      )
  );
};

const iterators = {
  findings: (result = { findings: [] }, command = () => {}, params = []) => {
    result.findings.forEach(finding => command(finding, ...params));
    return true;
  },
  positions: (
    finding = { location: { positions: {} } },
    liner = () => {},
    indexer = () => {},
    linerParams = [],
    indexerParams = []
  ) => {
    Object.keys(finding.location.positions).forEach(index => {
      liner(finding.location.positions[index].line, ...linerParams);
      indexer(index, ...indexerParams);
    });
    return true;
  },
};

const factory = {
  build: (key, ...params) => nest(key, params),
  return: (key, ...params) => nest(key, params)[key],
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

const fail = message => ({
  id: "501-Server-Error",
  status: "Failure",
  error: message,
  queuedAt: Date.now(),
  scanningAt: Date.now(),
  finishedAt: Date.now(),
});

module.exports = {
  get,
  post,
  validate,
  iterators,
  factory,
  findingsTypeChecker,
};
