module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("account", {
    user_id: {


        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true


    },
    email: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    },
    {
        // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,
    });
    return account;
   };