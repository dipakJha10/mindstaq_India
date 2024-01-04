const router = require("express").Router();
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const models = require("../../model/model");
const constants = require("../../utilities/constants");
const emailService = require("../../utilities/emailConfig");
const emailContent = require("../../utilities/emailTemplate");
const authService = require("../../utilities/authService");
const userModel = models.user;
const logger = require("../../utilities/logger").logger;

// register user
router.post("/signUp", async (req, res) => {
  try {
    const { userName, firstName, lastName, email, mobileNumber, password } =
      req.body;
    const oldUser = await userModel.findOne({ userName });
    if (oldUser) {
      return res.status(409).send("user exist, please go to login");
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      password: encryptedPassword,
    });
    let mailObject = emailContent.emailContentCreation(newUser, "Sign-Up Mail");
    emailService.sendEmail(mailObject);
    logger.info(
      `New user has been added and mail has been triggered at ${Date.now()}`
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: "User has been registered and a welcome mail has been sent on the registered email",
    });
  } catch (error) {
    logger.error(`Error in sign up api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

// user login Api
router.post("/logIn", async (req, res) => {
  try {
    const user = await userModel.findOne({
      userName: req.body.userName,
    });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = await authService.signIn({ userName: req.body.userName });
        let data = {
          userName: req.body.userName,
          token: token,
        };
        logger.info(`User has been logged in at ${Date.now()}`);
        res.status(200).json({
          status: httpStatus.OK,
          message: constants.constants.AUTHORIZATION_SUCCESS_MESSAGE,
          data: data,
        });
      } else {
        res.status(200).json({
          status: httpStatus.OK,
          message: constants.constants.PASSWORD_MISMATCH,
          data: null,
        });
      }
    } else {
      res.status(200).json({
        status: httpStatus.OK,
        message: constants.constants.USER_NOT_EXISTS,
        data: null,
      });
    }
  } catch (error) {
    logger.error(`Error in log in api - ${JSON.stringify(error)}`);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      error: error?.message ? error.messsage : JSON.stringify(error),
    });
  }
});

module.exports = router;
