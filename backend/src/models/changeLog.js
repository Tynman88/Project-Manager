const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChangeLog = sequelize.define('ChangeLog', {
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  change: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ChangeLog;
