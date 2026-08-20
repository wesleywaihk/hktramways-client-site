// Works around intermittent "SocketError: other side closed" failures when
// strapi export/import stream many S3 assets over undici's keep-alive pool
// (idle sockets get reused after S3 has already closed them). Shortening the
// keep-alive timeout forces fresh connections before that happens.
const { Agent, setGlobalDispatcher } = require('undici');
setGlobalDispatcher(new Agent({
  keepAliveTimeout: 1000,
  keepAliveMaxTimeout: 1000,
  pipelining: 0,
}));
