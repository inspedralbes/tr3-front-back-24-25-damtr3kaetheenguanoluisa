import express from 'express';
import { Game } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const { score, level, currentPlayers, winnerId } = req.body;
        const newGame = await Game.create({ score, level, currentPlayers, winnerId });
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { score, level, currentPlayers, winnerId} = req.body;
        const game = await Game.findByPk(req.params.id);
        if (game) {
            await game.update({ score, level, currentPlayers, winnerId });
            res.json(game);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            await game.destroy();
            res.status(204).send();
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});