const db = require("../models");
const ROLES = db.ROLES;
const Account = db.Account;
checkDuplicateUsernameOrEmail = (req, res, next) => {
 Account.findOne({
 where: {
    email: req.body.email
 }
 }).then(Account => {
 if (Account) {
 res.status(400).send({
 message: "Failed! Username is already in use!"
 });
 return;
 }
 // Email
 Account.findOne({
 where: {
 email: req.body.email
 }
 }).then(Account => {
 if (Account) {
 res.status(400).send({
 message: "Failed! Email is already in use!"
 });
 return;
 }
 next();
 });
 });
};
const verifySignUp = {
checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;