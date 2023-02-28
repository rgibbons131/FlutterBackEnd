const db = require("../models");
const config = require("../../config/db");
const account = db.account;
const user = db.user;

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


      var token = jwt.sign({ user_id: account.user_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      account.update({token})


      return res.status(200).send({token})

      
    })
    // .catch(err => {
    //   res.status(500).send({ message: err.message });
    // })
    ;
};


exports.authenticate = (req) => {
  var cert = jwt.verify(req.token, config.secret);

  account.findOne({

    where: {
      user_id: cert.user_id
    }
  })

  .then(account =>{
    if (!account) {
      return false;
    }
    if(account.token == decoded){

      return true;
    }
    else{
      return false;
    }
  })
};