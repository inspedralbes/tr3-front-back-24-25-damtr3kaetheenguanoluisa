import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Skin', {
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
};