const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const commentsRouter = require('./comments');

router.use('/users', usersRouter);
router.use('/comments', commentsRouter);

module.exports = router;
