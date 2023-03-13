const db = require("../models");
const config = require("../../config/db");
const key = require("../../config/auth");
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

// Find and view user profile
exports.viewProfile = (req, res) => {
  if (authenticate.authenticate(req) == true) {
    const id = req.params.id;
    account
      .findByPk(id)
      .then((account) => {
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
          dateOfBirth: account.dateOfBirth,
        };
        // Return the profile object
        res.status(200).send({ profile: profile });
      })
      // Catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: err.message });
      });
  } else {
    // If the user is not authenticated, return an error
    res.status(401).send({ message: "Not authorized" });
  }
};

// Find and view user profile by username (for search)
exports.getAccount = (req, res) => {
  if (authenticate.authenticate(req) == true) {
    // Get the username from the request.
    account
      .findOne({
        where: { id: req.userId },
        attributes: { exclude: ["password"] },
      })
      .then((account) => {
        // If the account is not found, return a 404 error.
        if (!account) {
          return res.status(404).send({ message: "account not found." });
        }
        // Return the account object.
        res.status(200).send(account);
      })
      // Catch any errors.
      .catch((err) => {
        // Return a 500 error.
        res.status(500).send({ message: err.message });
      });
  } else {
    // If the user is not authenticated, return an error
    res.status(401).send({ message: "Not authorized" });
  }
};

// Update an account by the id in the request
exports.updateAccount = (req, res) => {
  if (authenticate.authenticate(req) == true) {
    // Get the id from the request.
    account.findOne({ where: { id: req.userId } }).then((account) => {
      if (!account) {
        // If the account is not found, return a 404 error.
        return res.status(404).send({ message: "account not found." });
      }
      // Update the account object.
      account.email = req.body.email;
      account.username = req.body.username;
      // Save the account object.
      account
        .save()
        .then(() => {
          // Return a 200 response. account updated successfully.
          res.status(200).send({ message: "account updated successfully!" });
        })
        // Catch any errors.
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    });
  } else {
    res.status(401).send({ message: "Not authorized" });
  }
};

exports.getProfiles = (req, res) => {
  // takes all accounts and filters according to a passed-in city and gender preference
  // and returns up to 10
  const profiles = [];
  // this is where the token is checked
  if (authenticate.authenticate == true) {
    User.findAll()
      .then((users) => {
        // Loop through all users
        for (const user of users) {
          if (user.city === req.body.city && user.gender === req.body.gender) {
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
              dateOfBirth: user.dateOfBirth,
            });
          }
          // If we have 10 profiles, break out of the loop
          if (profiles.length >= 10) {
            break;
          }
        }
        // Return the created profiles array as a response.
        res.status(200).send({ profiles });
      })
      // Catch any errors
      .catch((err) => {
        console.log(err);
        return [];
      });
  } else {
    res.status(401).send({ message: "Not authorized" });
  }
};

// Delete user's profile information and then delete the user from the database
exports.deleteAccount = (req, res) => {
  const userId = req.params.userId;
  if (authenticate.authenticate(req) == true) {
    // Delete user's profile information
    account
      .destroy({
        where: { user_id: userId },
      })
      .then((num) => {
        if (num == 1) {
          // User's profile information deleted successfully
          console.log(`User's profile information deleted successfully.`);
        } else {
          // User's profile information could not be deleted
          console.log(
            `Cannot delete user's profile information. Maybe user was not found!`
          );
        }
      })
      .catch((err) => {
        // Handle any errors that occur
        console.log(`Error deleting user's profile information: ${err}`);
      });

    // Delete user from the database
    account
      .destroy({
        where: { user_id: userId },
      })
      .then((num) => {
        if (num == 1) {
          // User deleted successfully
          res.status(200).send({ message: "User deleted successfully!" });
        } else {
          // User could not be deleted
          res
            .status(400)
            .send({ message: "Cannot delete user. Maybe user was not found!" });
        }
      })
      .catch((err) => {
        // Handle any errors that occur
        res.status(500).send({ message: "Error deleting user: " + err });
      });
  }
  res.status(500).send({ message: "User not Authorized to delete account" });
};
