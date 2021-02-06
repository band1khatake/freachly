const express = require('express');
const CommentService = require('../services/comment');
const logger = require('../utils/logger');
const { handleGet, handlePost, handleDelete, handlePut } = require('../utils/router');
const router = express.Router();

/**
 * given that there is no auth service everyone can do everything
 */

router.get('/getUserComments/:userId', async (req, res) => {
  await handleGet({
    res,
    req,
    modelName: 'comment',
    getParam: 'userId',
    processFn(userId) {
      return CommentService.getCommentByUserId(userId);
    },
  });
});

router.get('/topHashtags', async (req, res) => {
  try {
    const result = await CommentService.getTopHashtags();
    res.send(result);
  } catch (error) {
    logger.error(`Could not aggregate top comment's hashtags, error:`, error.message);
    return res.sendStatus(500);
  }
});

router.get('/topMentions', async (req, res) => {
  try {
    const result = await CommentService.getTopMentions();
    res.send(result);
  } catch (error) {
    logger.error(`Could not aggregate top comment's mentions, error:`, error.message);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  await handleGet({
    res,
    req,
    modelName: 'comment',
    processFn(id) {
      return CommentService.getCommentById(id);
    },
  });
});

router.post('/', async (req, res) => {
  await handlePost({
    res,
    req,
    modelName: 'comment',
    processFn(data) {
      /**
       * userId has to come from auth service, given that there is no authorization, it is part of the payload
       */
      return CommentService.createNewComment(data);
    },
  });
});

router.delete('/:id', async (req, res) => {
  await handleDelete({
    res,
    req,
    modelName: 'comment',
    processFn(id) {
      return CommentService.removeCommentById({ _id: id });
    },
  });
});

router.put('/:id', async (req, res) => {
  await handlePut({
    res,
    req,
    modelName: 'comment',
    processFn(id, data) {
      return CommentService.updateCommentById(id, data);
    },
  });
});

module.exports = router;
