const { pipe } = require('../../utilities/frp')
const { withFindings, createFinding } = require('./findings')

const createResult = ({
  id = '',
  status = '',
  repo = '',
  findings = [],
  queuedAt = Date.now() / 1000,
  scanningAt = Date.now() / 1000,
  finishedAt = Date.now() / 1000
} = {}) =>
  pipe(withFindings)({
    id,
    status,
    repo,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
    /**
     * Add finding to array, overwriting empty mixin as required.
     *
     * @param {Object} result Value to add finding
     * @param {Object} finding Finding to add
     */
    addFinding (finding) {
      const last = this.findings.length - 1
      if (
        JSON.stringify(this.findings[last]) === JSON.stringify(createFinding())
      ) {
        this.findings[last] = finding
      } else {
        this.findings.push(finding)
      }
      return this
    }
  })

module.exports = { createResult }
