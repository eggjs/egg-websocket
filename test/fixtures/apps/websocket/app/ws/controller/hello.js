'use strict';

class HelloController {
  constructor(app) {
    this.config = app.config;
    this.service = app.service;
  }

  async connection(ws, req) {
    console.log('connected');
  }

  async message(ws, message) {
    console.log(message);
    ws.send(`receive ${message}`);
  }

  async close(ws, code, reason) {
    console.log(`closed ${code} ${reason}`);
  }
}

module.exports = HelloController;
