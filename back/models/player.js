import { DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

const Player = sequelize.define('player', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bombs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enemiesEliminated: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skinId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'skins',
        key: 'id',
      },
      onDelete: 'SET NULL ',
    },
    powerUpId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'powerUps',
        key: 'id',
      },
      onDelete: 'SET NULL ',
    },
  }, {
    tableName: 'player',
    timestamps: false,
  });

export default Player;