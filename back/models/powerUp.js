import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PowerUp = sequelize.define('PowerUp', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  effect: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'powerUps',
  timestamps: true,
});

export default PowerUp;