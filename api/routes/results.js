const assert = require("assert");
const { patterns, status, clocker } = require("../utilities/validation");
const { pipe } = require("../utilities/frp");

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
  try {
    return typeChecker(result);
  } catch (error) {
    if (error instanceof assert.AssertionError && recover) {
      return recovery(result, error);
    }
  }
};

const recovery = (result, error) => {
  try {
    return typeChecker(JSON.encode(JSON.stringify.replace(/\.\,\-\?\//, "")));
  } catch (recoveryError) {
    return fail(error.message);
  }
};

const typeChecker = result => {
  assert.ok(result.id.test(patterns.RFC4122), "id is GUID");
  assert.ok(status.includes(result.status), "status is in range");
  assert.ok(result.repo.test(patterns.github), "repo is valid github slug");
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
};

const findingsTypeChecker = finding => {
  assert.ok(
    finding.ruleId.test(patterns.ruleId),
    "finding.ruleId matches validation.patterns.ruleId"
  );
  assert.ok(
    finding.metadata.description.test(patterns.punctuation(100)),
    "finding.metadata.description matches validation.patterns.punctuation(100)"
  );
  assert.ok(
    finding.metadata.severity.test(patterns.underscore(12)),
    "finding.metadata.severity matches validation.patterns.underscore(12)"
  );
  assert.ok(
    finding.location.path.test(patterns.path(30)),
    "finding.location.path matches validation.patterns.path(30)"
  );
  iterators.positions(
    finding,
    line => assert.ok(Number.isInteger(line)),
    index =>
      assert.ok(
        index.test(patterns.underscore(12)),
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

const generators = {
  result: (...params) => ({
    id,
    status,
    repo,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
  }),
  finding: (...params) => ({
    type,
    ruleId,
    location,
    metadata,
  }),
  location: (...params) => ({
    path,
    positions,
  }),
  positions: (...params) => ({}),
  metadata: (...params) => ({
    metadata: {
      description,
      severity,
    },
  }),
  generate: () => {},
  valid: {
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
  generators,
  findingsTypeChecker,
};
