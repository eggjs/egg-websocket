'use strict';
const Ws = require('./lib/ws');

module.exports = app => {
  app.coreLogger.info('[egg-websocket] begin start');
  const start = Date.now();
  app.ws = new Ws(app);
  app.coreLogger.info('[egg-websocket] started use %d ms', Date.now() - start);
};
