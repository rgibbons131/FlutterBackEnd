const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth")
const account = db.account;
const user = db.user;
const authenticate = require("./tokenAuth")
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async  (req, res) => {
  // Save account to Database
  const newAccount = await account.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
  ;

  console.log(user)


  const id = newAccount.user_id;
  const newUser = await user.create({
    user_id: id,

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    phone: req.body.phone,
    gender: req.body.gender,
    orientation: req.body.gender,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
  })
  .catch(err => {
    res.status(500).send({ message: err.message })
    ;
  })
  ;

  res.status(200).send({message: "ok"});

};

exports.signin = (req, res) => {
  account.findOne({
    where: {

      email: req.body.email

    }
  })
    .then(account => {
      if (!account) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        account.password
      );

      if (!passwordIsValid) {
        return res.status(404).send({
          accessToken: null,
          message: "User Not found."
        });
      }


      var token = jwt.sign({ user_id: account.user_id }, key.secret, {
        expiresIn: 86400 // 24 hours
      },);
      
      account.update({token})


      return res.status(200).send({token})

      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
    ;
};

exports.signout = (req, res) => {
  if (req.body.email == null) {
    // If the user is not authenticated, return an error response
    return res.status(401).send({ message: "User is not authenticated1." });
  }
  else if (authenticate.authenticate(req) == false) {
    // If the user is not authenticated, return an error response
    return res.status(401).send({ message: `User is not authenticated2.` });
  }
  else {
    account.findOne({
  
      where: {
        email: req.body.email
      }
    }).then(account => {
    try{
      var token = null;
      account.update({token});
      console.log(`${account.token}`)
      res.status(200).send({ message: "User signed out successfully." });}
    catch(error){
      return res.status(401).send({ message: "Logout failed." });
    }})

  
  }

};