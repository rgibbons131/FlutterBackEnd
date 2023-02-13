module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("User", {
    user_id: {
    type: sequelize.INTEGER
    },
    first_name: {
        type: sequelize.STRING
    },
    last_name : {
        type: Sequelize.STRING
    },
    city: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.STRING
    },
    gender: {
        type: sequelize.STRING
    },
    orientation: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    date_of_birth: {
        type: sequelize.STRING
    },
    });
    return Account;
   };