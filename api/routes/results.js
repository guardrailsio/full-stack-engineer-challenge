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
};
