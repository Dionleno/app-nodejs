"use strict"
const express = require('express');
Object.defineProperty(exports, "__esModule", { value: true });

class App {
  express;
  constructor() {
    this.express = express();
    this.middleware();
  }

  middleware() {
    this.express.use('/auth', (req, res, next) => {
      res.send({
        hello: "teste 3"
      })
    })
  }
}
export default new App().express;