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

Users.hasOne(Player, {foreignKey: 'userId',as: 'player',});
Player.belongsTo(Users, {foreignKey: 'userId',as: 'user',});
  
Player.hasMany(Skins, {foreignKey: 'playerId',as: 'Skinss',});
Skins.belongsTo(Player, {foreignKey: 'playerId',as: 'player',});
  
Player.hasMany(PowerUps, {foreignKey: 'playerId',as: 'PowerUpss',});
PowerUps.belongsTo(Player, {foreignKey: 'playerId',as: 'player',});

Levels.hasMany(Enemy, {foreignKey: 'levelId',as: 'Enemy',});
Enemy.belongsTo(Levels, { foreignKey: 'levelId', as: 'enemyLevel' });
  
Games.belongsTo(Levels, { foreignKey: 'levelId', as: 'gameLevel' });
Levels.hasMany(Games, {foreignKey: 'levelId',as: 'games',});
  
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
