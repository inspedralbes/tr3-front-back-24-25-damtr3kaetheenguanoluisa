import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bombs: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
  bombsUsed:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  speed:{
    type: DataTypes.INTEGER,
    defaultValue:5,
  },
  victories: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  enemiesDefeated: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'players',
  timestamps: false,
});

export default Player;