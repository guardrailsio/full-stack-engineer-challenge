const get = () => {
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

const validate = () => {
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

module.exports = { get, post, validate, iterators };
