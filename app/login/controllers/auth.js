const db = require("../models");
const config = require("../../config/db");
const Account = db.Account;
const User = db.User;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save Account to Database
  Account.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  // Save User to database
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.boy.city,
    phone: req.body.phone,
    gender: req.body.gender,
    orientation: req.body.gender,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Account.findOne({
    where: {
      username: req.body.email
    }
  })
    .then(Account => {
      if (!Account) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        Account.password
      );

      if (!passwordIsValid) {
        return res.status(404).send({
          accessToken: null,
          message: "User Not found."
        });
      }

      var token = jwt.sign({ user_id: Account.user_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      return res.status(200).send({token})

      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.authenticate = (req, res) => {
  var cert = jwt.verify(req.token, config.secret);
  Account.findOne({
    where: {
      user_id: cert.user_id
    }
  })
};