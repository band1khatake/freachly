const express = require('express');
const UserService = require('../services/user');
const { handleGet, handlePost, handleDelete, handlePut } = require('../utils/router');
const router = express.Router();

/**
 * given that there is no auth service everyone can do everything
 */
router.get('/:id', async (req, res) => {
  await handleGet({
    res,
    req,
    modelName: 'user',
    processFn(id) {
      return UserService.getUserById(id);
    },
  });
});

router.post('/', async (req, res) => {
  await handlePost({
    res,
    req,
    modelName: 'user',
    processFn(data) {
      return UserService.createNewUser(data);
    },
  });
});

router.delete('/:id', async (req, res) => {
  await handleDelete({
    res,
    req,
    modelName: 'user',
    processFn(id) {
      return UserService.removeUserById({ _id: id });
    },
  });
});

router.put('/:id', async (req, res) => {
  await handlePut({
    res,
    req,
    modelName: 'user',
    processFn(id, data) {
      return UserService.updateUserById(id, data);
    },
  });
});

module.exports = router;
