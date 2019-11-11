const assert = require("assert");
const { patterns, status, clock } = require("../utilities/validation");
const { iterators } = require("./iterators");

const validate = result => {
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
    clock(result.queuedAt),
    "queuedAt greater than retention and not in the future"
  );
  assert.ok(
    clock(result.scanningAt),
    "scanningAt greater than retention and not in the future"
  );
  assert.ok(
    clock(result.finishedAt),
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

module.exports = { validate, recovery, typeChecker, findingsTypeChecker };
