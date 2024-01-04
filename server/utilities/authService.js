const jsonwebtoken = require("jsonwebtoken");
const constants = require("../utilities/constants");
const httpStatus = require("http-status");
const models = require("../model/model");
const users = models.user;
const logger = require("./logger").logger;


const signIn = async (signedUser) => {
  try {
    let user = await users.findOne({ userName: signedUser.userName });
    let tokenPayload = {
      userId: user._id,
      username: user.userName,
      roles: user.role,
    };
    const token = jsonwebtoken.sign(
      tokenPayload,
      constants.authConstants.secret_key,
      {
        expiresIn: constants.authConstants.expires_in,
      }
    );
    return token;
  } catch (error) {
    logger.error(`Error in SignIn - ${JSON.stringify(error)}`);
    throw error;
  }
};

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res
        .status(403)
        .send({ status: httpStatus.FORBIDDEN, message: "Access Denied" });
    }
  } catch (err) {
    logger.error(`Error in VerfyToken - ${JSON.stringify(err)}`);
    throw err;
  }
};

const tokenValidation = async (req, res, next) => {
  try {
    jsonwebtoken.verify(
      req.token,
      constants.authConstants.secret_key,
      async (err, authData) => {
        if (err) {
          res.status(403).send({
            status: httpStatus.FORBIDDEN,
            message: constants.constants.FORBIDDEN_MSG,
            data: null,
          });
        } else {
          if (authData.roles === "admin") {
            next();
          } else if (
            authData.roles === "user" &&
            req.baseUrl.includes("user")
          ) {
            next();
          } else {
            res.status(403).send({
              status: httpStatus.FORBIDDEN,
              message: "Insufficient permissions",
              data: null,
            });
          }
        }
      }
    );
  } catch (err) {
    logger.error(`Error in tokenValidation - ${JSON.stringify(err)}`);
    throw err;
  }
};

module.exports = {
  signIn,
  verifyToken,
  tokenValidation,
};
