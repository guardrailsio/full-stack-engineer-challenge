const tap = require('tap')
const { createResult } = require('../../routes/results/factory')
const { createFinding } = require('../../routes/results/findings')
const { validate } = require('../../routes/results/validate')

// builds with no data
tap.ok(createResult())
// builds with valid data
tap.test('Result factory valid', t => {
  // @TODO: make this into it's own function. Instead of passing around objects as mocks, want to do some transforms
  // like, test UTF, or test empty findings,
  const result = createResult({
    id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
    status: 'Success',
    repo: 'test'
  })

  const finding = createFinding({ type: 'sast', ruleId: 'G402' })
  finding.location.path = 'connectors/apigateway.go'
  finding.location.positions.begin = { line: 60 }
  finding.metadata.description = 'TLS InsecureSkipVerify set true.'
  finding.metadata.severity = 'HIGH'
  result.addFinding(finding)
  tap.ok(validate(result), 'factory.createResult returns valid types')
  t.end()
})
