
const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth")
const account = db.account;

const authenticate = require("./tokenAuth");

const user = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


  exports.viewProfile = (req, res) => {
    if(authenticate.authenticate(req) == true){
    const id = req.params.id;
    account.findByPk(id)
      .then(account => {
        if (!account) {
          return res.status(404).send({ message: "account not found" });
        }
  
        // Only return certain fields from the account object
        const profile = {
          id: account.id,
          username: account.username,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          city: account.city,
          phone: account.phone,
          gender: account.gender,
          orientation: account.orientation,
          dateOfBirth: account.dateOfBirth
        };
  
        res.status(200).send({ profile: profile });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message });
      });
    }
    else{
      res.status(401).send({message: "Not authorized"});
    };
  };

  exports.getAccount = (req, res) => {
    if(authenticate.authenticate(req) == true){
    account.findOne({
      where: { id: req.userId },
      attributes: { exclude: ["password"] }
    })
      .then(account => {
        if (!account) {
          return res.status(404).send({ message: "account not found." });
        }
  
        res.status(200).send(account);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }
    else{
      res.status(401).send({message: "Not authorized"});
    };
  };
  
  exports.updateAccount = (req, res) => {
    if(authenticate.authenticate(req) == true){
    account.findOne({ where: { id: req.userId } }).then(account => {
      if (!account) {
        return res.status(404).send({ message: "account not found." });
      }
  
      account.email = req.body.email;
      account.username = req.body.username;
  
      account.save()
        .then(() => {
          res.status(200).send({ message: "account updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    });}
    else{
      res.status(401).send({message: "Not authorized"});
    };
  };


  exports.getProfiles = (req, res) => {
    // takes all accounts and filters according to a passed-in city and gender preference 
    // and returns up to 10
    const profiles = [];
    


    user.findAll()
      .then(users => {
        for (const user of users) {

          if ((user.city === req.body.city) && (user.gender === req.body.orientation)) {



            profiles.push({
              id: user.id,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              city: user.city,
              phone: user.phone,
              gender: user.gender,
              orientation: user.orientation,
              dateOfBirth: user.dateOfBirth
            });
          }
          else{
            profiles.push("test")
          }
          
          if (profiles.length >= 10) {
            break;
          }
        }

        res.status(200).send({profiles});

      })
      .catch(err => {
        console.log(err);
        return [];
      });}
      else{
        res.status(401).send({message: "Not authorized"});
      };
  }
 


  // Delete user's profile information and then delete the user from the database
exports.deleteAccount = (req, res) => {
const userId = req.params.userId;
  if(authenticate.authenticate(req) == true){

  // Delete user's profile information
  account.destroy({
    where: { user_id: userId }
  })
  .then(num => {
    if (num == 1) {
      // User's profile information deleted successfully
      console.log(`User's profile information deleted successfully.`);
    } else {
      // User's profile information could not be deleted
      console.log(`Cannot delete user's profile information. Maybe user was not found!`);
    }
  })
  .catch(err => {
    // Handle any errors that occur
    console.log(`Error deleting user's profile information: ${err}`);
  });

  // Delete user from the database
  account.destroy({
    where: { user_id: userId }
  })
  .then(num => {
    if (num == 1) {
      // User deleted successfully
      res.status(200).send({ message: "User deleted successfully!" });
    } else {
      // User could not be deleted
      res.status(400).send({ message: "Cannot delete user. Maybe user was not found!" });
    }
  })
  .catch(err => {
    // Handle any errors that occur
    res.status(500).send({ message: "Error deleting user: " + err });
  });}
  res.status(500).send({ message: "User not Authorized to delete account"});
};


