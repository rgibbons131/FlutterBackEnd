module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
    
        user_id: {

        type: Sequelize.INTEGER,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name : {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    orientation: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    date_of_birth: {
        type: Sequelize.STRING
    }
    },
    {
        // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,
    });

    return user;
   };