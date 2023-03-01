const db = require("../models");
const account = db.account;
checkDuplicateUsernameOrEmail = (req, res, next) => {

  try {
   account.findOne({
      where: {
         email: req.body.email
      }
      }).then(account => {
      if (account) {
      res.status(400).send({
      message: "Failed! Username is already in use!"
      });
      return;
      }});
      // Email
  } catch (error) {
   res.status(400).send({
      message: "Error finding account"
      });
  }
   

};
const verifySignUp = {
checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;