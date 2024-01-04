const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const publicApi = require("./controllers/public/signUpLogin");
const userApi = require("./controllers/users/item");
const adminApi = require("./controllers/admin/items");
const db = require("./db/db");
const authService = require("./utilities/authService");
const logger = require('./utilities/logger').logger

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
logger.info(`Application restarted at ${Date.now()}`)

app.get("/", function (req, res) {
  res.send({
    status: "ON",
    message: "Api service is running!!",
  });
});

app.use("/api/", publicApi);
app.use(authService.verifyToken);

app.use("/api/admin/", authService.tokenValidation, adminApi);
app.use("/api/user/", authService.tokenValidation, userApi);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is up at 3000");
});
