const tap = require('tap')
const { createResult } = require('../../routes/results/factory')
const { validate } = require('../../routes/results/validate')
const { valid } = require('../../utilities/validation')

// builds with no data
tap.ok(createResult())
// builds with valid data
tap.test('Result factory valid', t => {
  // @TODO: make this into it's own function. Instead of passing around objects as mocks, want to do some transforms
  // like, test UTF, or test empty findings,
  const result = createResult()
  result.id = '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
  result.status = 'Success'
  result.repo = 'test'
  result.findings[0].type = 'sast'
  result.findings[0].ruleId = 'G402'
  result.findings[0].location.path = 'connectors/apigateway.go'
  result.findings[0].location.positions.begin = { line: 60 }
  result.findings[0].metadata.description = 'TLS InsecureSkipVerify set true.'
  result.findings[0].metadata.severity = 'HIGH'
  console.log(result)
  tap.ok(validate(result), 'factory.createResult returns valid types')
  tap.same(result, valid.single)
  t.end()
})
