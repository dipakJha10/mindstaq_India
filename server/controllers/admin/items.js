const router = require("express").Router();
const httpStatus = require("http-status");
const models = require("../../model/model");
const constants = require("../../utilities/constants");
const itemModel = models.item;
const logger = require("../../utilities/logger").logger;

// creating items
router.post("/items", async (req, res) => {
  try {
    const items = new itemModel(req.body);
    const newItems = await items.save();
    logger.info(`New item has been added at ${Date.now()}`);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: newItems,
    });
  } catch (error) {
    logger.error(`Error in post items api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

// update an item
router.put("/items", async (req, res) => {
  try {
    const item = await itemModel.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true }
    );
    logger.info(`Item has been updated at ${Date.now()}`);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: item,
    });
  } catch (error) {
    logger.error(`Error in update items api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

// delete an item
router.delete("/items", async (req, res) => {
  try {
    await itemModel.findOneAndDelete({
      _id: req.query.id,
    });
    logger.info(`Item has been deleted at ${Date.now()}`);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: "Item has been deleted successfully",
    });
  } catch (error) {
    logger.error(`Error in delete items api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

module.exports = router;
