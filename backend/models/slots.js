const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Slots = sequelize.define('slots', {
  time: Sequelize.STRING,
  count : Sequelize.INTEGER
});

module.exports = Slots;