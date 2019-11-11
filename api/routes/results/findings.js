const { pipe } = require("../../utilities/frp");
const { withLocation } = require("./findings/location");
const { withMetadata } = require("./findings/metadata");

const createFinding = ({
  type = "",
  ruleId = "",
  location = {},
  metadata = {},
} = {}) =>
  pipe(
    withLocation,
    withMetadata
  )({
    type,
    ruleId,
    location,
    metadata,
  });

const withFindings = result => ({
  ...result,
  findings: [...result.findings, createFinding()],
});

module.exports = { withFindings };
