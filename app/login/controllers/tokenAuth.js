const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth")
const account = db.account;
const user = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.authenticate = (req) => {

    account.findOne({
  
      where: {
        email: req.body.email
      }
    })
  
    .then(account =>{
      if (account == null) {
        console.log(`1${account}`)
        return false;
      }
      else if(req.body.token == account.token){
        console.log(`2${account}`)
        return true;
      }
      else{
        console.log(`3${account}`)
        return false;
      }
    })
    console.log(`end`)}