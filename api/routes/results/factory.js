const { pipe } = require("../../utilities/frp");
const { withFindings } = require("./findings");

const createResult = ({
  id = "",
  status = "",
  repo = "",
  findings = [],
  queuedAt = Date.now(),
  scanningAt = Date.now(),
  finishedAt = Date.now(),
} = {}) =>
  pipe(withFindings)({
    id,
    status,
    repo,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
  });

module.exports = { createResult };
