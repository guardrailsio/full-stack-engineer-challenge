const tap = require('tap')
const request = require('request')
const buildFastify = require('../fastify')
const { validate } = require('../routes/results/validate')

tap.test('GET `/` route', t => {
  const fastify = buildFastify()
  t.plan(5)
  t.tearDown(() => fastify.close())

  fastify.listen(0, err => {
    t.error(err)

    request(
      {
        method: 'GET',
        url: 'http://localhost:' + fastify.server.address().port
      },
      (err, response, body) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200)
        t.strictEqual(
          response.headers['content-type'],
          'application/json; charset=utf-8'
        )
        t.ok(validate(JSON.parse(body)))
      }
    )
  })
})
