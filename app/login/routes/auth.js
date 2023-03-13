const { verifySignUp } = require("../middleware");
const controllerAuth = require("../controllers/auth");
const controllerAcct = require("../controllers/account");
module.exports = function(app) {
 app.use(function(req, res, next) {
 res.header(
 "Access-Control-Allow-Headers",
 "x-access-token, Origin, Content-Type, Accept"
 );
 next();
 });
 app.post(
 "/api/auth/signup",
 [
 verifySignUp.checkDuplicateUsernameOrEmail,
 ],
 controllerAuth.signup
 );

 app.post("/api/auth/signin", controllerAuth.signin);
 app.post("/api/auth/signout", controllerAuth.signout);
 app.post("/api/account/feed", controllerAcct.getProfiles);

};