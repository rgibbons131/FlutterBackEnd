const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth");
const account = db.account;
const user = db.user;
const authenticate = require("./tokenAuth");
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new account
exports.signup = async (req, res) => {
  try{
  // Save account to Database
  const newAccount = await account
    .create({
      // Requires creation of email and password.
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    // Catch any errors
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  console.log(user);

  // Create a new user profile based on signup information
  const id = newAccount.user_id;
  // Save user to Database and create a new user profile table.
  const newUser = await user
    .create({
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
    // Catch any errors
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  // Return a success message
  res.status(200).send({ message: "ok" });
}
catch(err){
  console.log(err)
  res.status(500).send({ message: err.message });
};}


// Sign in to an existing account
exports.signin = (req, res) => {
  try{
  // Find the account in the database by email
  account
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    // If the account is found, ask for password
    .then((account) => {
      if (!account) {
        return res.status(404).send({ message: "User Not found." });
      }
      // If the account is found, check the password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        account.password
      );
      // If the password is invalid, return an error
      if (!passwordIsValid) {
        return res.status(404).send({
          accessToken: null,
          message: "User Not found.",
        });
      }

      // If the password is valid, create a token
      var token = jwt.sign({ user_id: account.user_id }, key.secret, {
        expiresIn: 86400, // 24 hours
      });
      // Update the token in the database
      account.update({ token });

      // Return the token
      return res.status(200).send({ token });
    })
    // Catch any errors
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
}
catch(err){
  console.log(err);
  res.status(500).send({ message: err.message });
};}

// Sign out of an existing account and remove the token
exports.signout = (req, res) => {
  try{
  if (req.body.email == null) {
    // If the user is not authenticated, return an error response
    return res.status(401).send({ message: "User is not authenticated1." });
  } else if (authenticate.authenticate(req) == false) {
    // If the user is not authenticated, return an error response
    return res.status(401).send({ message: `User is not authenticated2.` });
  } else {
    account
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((account) => {
        try {
          var token = null;
          account.update({ token });
          console.log(`${account.token}`);
          res.status(200).send({ message: "User signed out successfully." });
        } catch (error) {
          return res.status(401).send({ message: "Logout failed." });
        }
      });
  }
}
catch(err){
  console.log(err)
  res.status(500).send({ message: err.message });
};}
