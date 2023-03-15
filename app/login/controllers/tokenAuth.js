const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth");
const account = db.account;
const user = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// authenticates the user and returns a token
exports.authenticate = (req) => {
  try{
  account
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    // If the token does not match, return an false
    .then((account) => {
      if (account == null) {
        console.log(`1${account}`);
        return false;
      }
      // If the token does match, return an true
      else if (req.body.token == account.token) {
        console.log(`2${account}`);
        return true;
      }
      // Else return an false
      else {
        console.log(`3${account}`);
        return false;
      }
    });
  console.log(`end`);
}
catch(err){
  console.log(err)
  res.status(500).send({ message: err.message });
};}
