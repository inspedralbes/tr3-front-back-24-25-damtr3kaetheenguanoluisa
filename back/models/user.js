import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },    
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {      
    type: DataTypes.STRING,
    allowNull: false,
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'players',
      key: 'id',
    },
    onDelete: 'SET NULL ',
  },
}, {
  tableName: 'users',
  timestamps: false,
});
};

