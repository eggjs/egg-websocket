'use strict';

module.exports = app => {
  const { ws } = app;
  ws.listen('/hello', ws.controller.hello);
};
