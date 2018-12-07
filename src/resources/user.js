const express = require('express');

module.exports = (app) => {
  var router = express.Router();

  router.get('user', (req, res) => {
    console.log(req);
    console.log(res);
    return res.status(200).json('result');
  })

  app.use('/api', router)
}