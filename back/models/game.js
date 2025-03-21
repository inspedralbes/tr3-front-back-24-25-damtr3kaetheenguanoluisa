import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Game = sequelize.define('Game', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        
        level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        winnerId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'players',
            key: 'id',
        },
        onDelete: 'SET NULL',
        },
    }, {
        tableName: 'games',
        timestamps: true,
    });

export default Game;