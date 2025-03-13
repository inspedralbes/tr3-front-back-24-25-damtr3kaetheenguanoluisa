import  sequelize  from './config/database.js';
import usersModels from './models/users.js';
import enemiesModels from './models/enemies.js';
import playersModels from './models/players.js';
import levelModels from './models/level.js';
import gameModels from './models/game.js';
import skinModels from './models/skin.js';
import powerUpModels from './models/powerUp.js';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Database synchronized');
        await loadInitialData(); 
    } catch (error) {
        console.log('Error al sincronizar la base de datos', error);
    }
}

export {
    sequelize,
    usersModels,
    enemiesModels,
    playersModels,
    levelModels,
    gameModels,
    skinModels,
    powerUpModels,
    syncDatabase,
}
