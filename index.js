const express = require('express');
const db = require('./dbConnection');
const router = require('./routes');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3789;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
  logger.error(error);
  res.sendStatus(500);
});

db.once('open', function () {
  logger.info('connected to db!');

  app.listen(port, () => {
    logger.info(`app started at port: ${port}`);
  });
});
