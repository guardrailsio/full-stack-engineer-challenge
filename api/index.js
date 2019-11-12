const { get, post } = require("./routes/results");

// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  try {
    reply.send(get(request));
  } catch (error) {
    reply.send({ error });
  }
});

fastify.post("/", (request, reply) => {
  try {
    reply.send(post(request));
  } catch (error) {
    reply.send({ error });
  }
});

// Run the server!
fastify.listen(8080, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
