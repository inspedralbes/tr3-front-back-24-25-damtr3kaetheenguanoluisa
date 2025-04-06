import { DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

const Skin = sequelize.define('Skin', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sprite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'skins',
    timestamps: false,
  });

export default Skin;