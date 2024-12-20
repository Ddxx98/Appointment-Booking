const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-schema', 'root', 'deexith2024', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;