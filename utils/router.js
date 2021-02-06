const logger = require('./logger');
const { isValidationError } = require('./error');

async function handleGet(params) {
  const { res, req, processFn, modelName, getParam = 'id' } = params;
  const getParamValue = req.params[getParam];
  if (!getParamValue) {
    return res.status(400).send({ message: `${getParam} is required` });
  }
  try {
    const result = await processFn(getParamValue);
    if (!result) {
      return res.sendStatus(404);
    }
    res.send(result);
  } catch (error) {
    logger.debug(`Get ${modelName} error:`, error.message);
    if (isValidationError(error)) {
      return res.status(400).send({ message: error.message });
    }
    return res.sendStatus(500);
  }
}

async function handlePost(params) {
  const { res, req, processFn, modelName } = params;
  const data = req.body;

  if (!data) {
    return res.sendStatus(400);
  }
  try {
    const result = await processFn(data);
    res.status(201).send(result);
  } catch (error) {
    logger.debug(`Post ${modelName} error:`, error.message);
    if (isValidationError(error)) {
      return res.status(400).send({ message: error.message });
    }
    return res.sendStatus(500);
  }
}

async function handleDelete(params) {
  const { res, req, processFn, modelName } = params;
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: 'parameter id is required' });
  }
  try {
    const result = await processFn(id);
    if (!result.deletedCount) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    logger.debug(`Delete ${modelName} error:`, id, error.message);
    if (isValidationError(error)) {
      return res.status(400).send({ message: error.message });
    }
    return res.sendStatus(500);
  }
}

async function handlePut(params) {
  const { res, req, processFn, modelName } = params;
  const id = req.params.id;
  const data = req.body;
  if (!id) {
    return res.status(400).send({ message: 'parameter id is required' });
  }
  if (!data) {
    return res.status(400).send({ message: 'data is missing' });
  }
  try {
    const comment = await processFn(id, data);
    if (!comment) {
      return res.sendStatus(404);
    }
    res.status(200).send(comment);
  } catch (error) {
    logger.debug(`Put ${modelName} with ${id}, error:`, error.message);
    if (isValidationError(error)) {
      return res.status(400).send({ message: error.message });
    }
    return res.sendStatus(500);
  }
}

module.exports = {
  handleGet,
  handlePost,
  handleDelete,
  handlePut,
};
