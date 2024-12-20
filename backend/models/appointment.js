const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Appointment = sequelize.define('appointments', {
  name: Sequelize.STRING,
  email : {
    type: Sequelize.STRING,
    allowNull: false
  },
  slotId : Sequelize.INTEGER,
  time : Sequelize.STRING
});

module.exports = Appointment;