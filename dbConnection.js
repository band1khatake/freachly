require('./models');
const { env } = require('./config');
const logger = require('./utils/logger');

const mongoose = require('mongoose');
const url = env.MONGO_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  logger.error('connection error:', error);
});

module.exports = db;
