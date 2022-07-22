var express = require('express');
var router = express.Router();
// const models = require("../db/models");
router.get('/', async function (req, res, next) {
  res.send(
    {
      items: [],
      total: 0
    }
  );
});

module.exports = router;