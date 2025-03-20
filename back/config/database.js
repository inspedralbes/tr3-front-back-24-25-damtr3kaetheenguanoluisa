import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'tr3-Unity',
  'root',
  'root',
  {
    host: 'tr3-mysql' ,
    dialect: 'mysql',
    logging: false,
  }
);
export default sequelize;
