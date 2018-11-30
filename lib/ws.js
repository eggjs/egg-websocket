'use strict';
const path = require('path');
const WebSocket = require('ws');

class Ws {
  constructor(app) {
    this.app = app;
    this.listenMap = new Map();
    this._loadFiles();
    this.server = this._createServer();
  }

  _loadFiles() {
    const directory = path.join(this.app.config.baseDir, 'app/ws');
    this.app.loader.loadToApp(directory, 'wsFiles');
    this.controller = this.app.wsFiles.controller;
  }

  _createServer() {
    this.app.config.websocket.noServer = true;
    const wss = new WebSocket.Server(this.app.config.websocket);

    this.app.on('server', server => {
      server.on('upgrade', (request, socket, head) => {
        if (this.listenMap.has(request.url)) {
          socket.destroy();
          return;
        }
        wss.handleUpgrade(request, socket, head, ws => {
          const handler = this.listenMap.get(request.url);

          handler.connection(ws, request);

          ws.on('close', (code, reason) => {
            handler.close(ws, code, reason);
          });

          ws.on('message', message => {
            handler.message(ws, message);
          });

          if (handler.error) {
            ws.on('error', error => {
              handler.error(ws, error);
            });
          }

          if (handler.open) {
            ws.on('open', () => {
              handler.open(ws);
            });
          }

          if (handler.ping) {
            ws.on('ping', data => {
              handler.ping(ws, data);
            });
          }

          if (handler.pong) {
            ws.on('pong', data => {
              handler.pong(ws, data);
            });
          }
        });
      });
    });

    return wss;
  }

  listen(url, controller) {
    const handler = new controller(this.app);
    this.listenMap.set(url, handler);
  }
}

module.exports = Ws;
