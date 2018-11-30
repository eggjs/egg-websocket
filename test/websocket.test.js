'use strict';

// const assert = require('assert');
const mm = require('egg-mock');
// const WebSocket = require('ws');

describe('test/websocket.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/websocket',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    // const ws = new WebSocket('ws://localhost:7001');
  });
});
