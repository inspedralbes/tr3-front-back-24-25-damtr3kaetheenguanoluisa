CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    playerId INT UNIQUE,
    FOREIGN KEY (playerId) REFERENCES player(id)
);

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50) UNIQUE NOT NULL,
    bombs INT DEFAULT 0,
    wins INT DEFAULT 0,
    enemiesEliminated INT DEFAULT 0,
    skinId INT,
    powerUpId INT,
    FOREIGN KEY (skinId) REFERENCES skins(id),
    FOREIGN KEY (powerUpId) REFERENCES powerUps(id)
);

CREATE TABLE enemies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    health INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    speed INT NOT NULL
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    currentPlayers INT NOT NULL,
    level INT NOT NULL,
    winnerId INT,
    FOREIGN KEY (winnerId) REFERENCES player(id),
    FOREIGN KEY (level) REFERENCES level(id)
);

CREATE TABLE level (
    id SERIAL PRIMARY KEY,
    level_number INT NOT NULL,
    enemy_quantity INT NOT NULL
);

CREATE TABLE powerUps (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    effect VARCHAR(50),
    duration INT
);

CREATE TABLE skins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    sprite VARCHAR(255) NOT NULL
);