import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'a23kaeguapio_tr3-Unity',
  'a23kaeguapio_root',
  '011731Kae.',
  {
    host: 'dam.inspedralbes.cat' ,
    dialect: 'mysql',
    logging: false,
  }
);
export default sequelize;
