import  sequelize  from '../config/database.js';

import Users from './user.js';
import Enemy from './enemy.js';
import Player from './player.js';
import Levels from './level.js';
import Games from './game.js';
import Skins from './skin.js';
import PowerUps from './powerUp.js';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Database synchronized');
        await loadInitialData(); 
    } catch (error) {
        console.log('Error al sincronizar la base de datos', error);
    }
}

Games.belongsTo(Player, {foreignKey: 'winnerId',as: 'winner',});
Player.hasMany(Games, {foreignKey: 'winnerId',as: 'wonGames',});
  
  export {
    sequelize,
    Users,
    Enemy,
    Player,
    Levels,
    Games,
    Skins,
    PowerUps,
    syncDatabase,
};
