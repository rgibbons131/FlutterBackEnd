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
    const id = req.params.id;
    Account.findByPk(id)
      .then(account => {
        if (!account) {
          return res.status(404).send({ message: "Account not found" });
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
  };

  exports.getAccount = (req, res) => {
    Account.findOne({
      where: { id: req.userId },
      attributes: { exclude: ["password"] }
    })
      .then(account => {
        if (!account) {
          return res.status(404).send({ message: "Account not found." });
        }
  
        res.status(200).send(account);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.updateAccount = (req, res) => {
    Account.findOne({ where: { id: req.userId } }).then(account => {
      if (!account) {
        return res.status(404).send({ message: "Account not found." });
      }
  
      account.email = req.body.email;
      account.username = req.body.username;
  
      account.save()
        .then(() => {
          res.status(200).send({ message: "Account updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    });
  };
 
  