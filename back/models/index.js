import  sequelize  from '../config/database.js';

import Users from './user.js';
import Enemy from './enemy.js';
import Players from './player.js';
import Levels from './level.js';
import Games from './game.js';
import Skin from './skin.js';
import PowerUp from './powerUp.js';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Database synchronized');
        await loadInitialData(); 
    } catch (error) {
        console.log('Error al sincronizar la base de datos', error);
    }
}

Users.hasOne(Players, {foreignKey: 'userId',as: 'player',});
Players.belongsTo(Users, {foreignKey: 'userId',as: 'user',});
  
Players.hasMany(Skin, {foreignKey: 'playerId',as: 'skins',});
Skin.belongsTo(Players, {foreignKey: 'playerId',as: 'player',});
  
Players.hasMany(PowerUp, {foreignKey: 'playerId',as: 'powerUps',});
PowerUp.belongsTo(Players, {foreignKey: 'playerId',as: 'player',});

Levels.hasMany(Enemy, {foreignKey: 'levelId',as: 'enemies',});
Enemy.belongsTo(Levels, { foreignKey: 'levelId', as: 'enemyLevel' });
  
Games.belongsTo(Levels, { foreignKey: 'levelId', as: 'gameLevel' });
Levels.hasMany(Games, {foreignKey: 'levelId',as: 'games',});
  
Games.belongsTo(Players, {foreignKey: 'winnerId',as: 'winner',});
Players.hasMany(Games, {foreignKey: 'winnerId',as: 'wonGames',});
  
  export {
    sequelize,
    Users,
    Enemy,
    Players,
    Levels,
    Games,
    Skin,
    PowerUp,
    syncDatabase,
};
