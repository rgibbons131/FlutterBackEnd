module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("Account", {
    user_id: {
    type: sequelize.INTEGER
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
    });
    return Account;
   };