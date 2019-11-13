const { get, post } = require('./routes/results')

const Fastify = require('fastify')

function buildFastify () {
  const fastify = Fastify({
    logger: true
  })

  // Declare a route
  fastify.get('/', (request, reply) => {
    try {
      reply.send(get(request))
    } catch (error) {
      reply.send({ error })
    }
  })

  fastify.post('/', (request, reply) => {
    try {
      reply.send(post(request))
    } catch (error) {
      reply.send({ error })
    }
  })

  return fastify
}

module.exports = buildFastify
