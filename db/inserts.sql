INSERT INTO users (userName, password) VALUES 
('Jugador1', 'password123'),
('Jugador2', 'password456'),
('Jugador3', 'password789');

INSERT INTO player (userName, bombs, wins, enemiesEliminated) VALUES 
('Jugador1', 3, 10, 25),
('Jugador2', 5, 15, 30),
('Jugador3', 2, 8, 20);

INSERT INTO enemies (name, health, attack, defense, speed) VALUES 
('Enemy1', 100, 20, 10, 5),
('Enemy2', 120, 25, 15, 7),
('Enemy3', 90, 18, 8, 6);

INSERT INTO games (score, level, currentPlayers) VALUES 
(2000, 1, 2),
(3000, 2, 3),
(1500, 1, 1);

INSERT INTO level (level_number, enemy_quantity) VALUES 
(1, 5),
(2, 8),
(3, 12);

INSERT INTO powerUps (type, description, effect, duration) VALUES 
('Speed Boost', 'Aumenta la velocidad', 'speed+10', 5),
('Extra Bomb', 'Añade una bomba extra', 'bombs+1', 0),
('Shield', 'Reduce daño recibido', 'defense+20', 10);

INSERT INTO skins (name, description, sprite) VALUES 
('Skin1', 'Skin roja', 'skin1.png'),
('Skin2', 'Skin azul', 'skin2.png'),
('Skin3', 'Skin verde', 'skin3.png');