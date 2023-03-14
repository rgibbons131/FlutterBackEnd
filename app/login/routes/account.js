const { authJwt } = require("../middleware");
const controller = require("../controllers/account.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
};

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/account", [authJwt.verifyToken], controller.getAccount);
  app.put("/api/account", [authJwt.verifyToken], controller.updateAccount);
};
