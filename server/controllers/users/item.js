const router = require("express").Router();
const httpStatus = require("http-status");
const models = require("../../model/model");
const itemModel = models.item;
const constants = require("../../utilities/constants");
const logger = require("../../utilities/logger").logger;

// retrieve all items
router.get("/items", async (req, res) => {
  let offset;
  let limit;
  if (req.query.pageNo && req.query.perPage) {
    req.query.perPage = parseInt(req.query.perPage);
    req.query.pageNo = parseInt(req.query.pageNo);
    offset = req.query.perPage * (req.query.pageNo - 1);
    limit = req.query.perPage;
  } else {
    offset = 0;
    limit = 10;
  }
  try {
    const items = await itemModel.find({}).skip(offset).limit(limit);
    logger.info(`List of items has been retrieved at ${Date.now()}`);
    res.status(200).json({
      status: httpStatus.OK,
      message: "Request SuccessFull!!",
      data: items,
      count: items.length,
    });
  } catch (error) {
    logger.error(`Error in list items api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

// get by Id
router.get("/itemById", async (req, res) => {
  try {
    let item = await itemModel.findOne({
      _id: req.query.id,
    });
    if (!item) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Item not found",
        data: null,
      });
    }
    logger.info(`Item has been retrieved by id at ${Date.now()}`);
    return res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: item,
    });
  } catch (error) {
    logger.error(`Error in get item api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

module.exports = router;
