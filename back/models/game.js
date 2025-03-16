import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Game = sequelize.define('Game', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        currentPlayers:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
        },
        winnerId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'player',
            key: 'id',
        },
        onDelete: 'SET NULL',
        },
        levelId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'levels',
            key: 'id',
        },
        onDelete: 'SET NULL',
        },
    }, {
        tableName: 'games',
        timestamps: true,
    });

export default Game;