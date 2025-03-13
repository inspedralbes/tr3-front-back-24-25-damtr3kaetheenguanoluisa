import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Level', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enemy_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'levels',
    timestamps: false,
  });
};