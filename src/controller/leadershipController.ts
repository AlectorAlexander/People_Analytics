import express from 'express';
import LeadershipService from '../services/leadershipService';

const LeadershipController = express.Router();

LeadershipController.get('/subordinates/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const subordinates = await LeadershipService.getDirectSubordinates(email);
        res.json(subordinates);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

LeadershipController.get('/leaders/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const leaders = await LeadershipService.getDirectLeaders(email);
        res.json(leaders);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

LeadershipController.get('/indirectSubordinates/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const subordinates = await LeadershipService.getIndirectSubordinates(email);
        res.json(subordinates);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

LeadershipController.get('/indirectLeaders/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const leaders = await LeadershipService.getIndirectLeaders(email);
        res.json(leaders);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default LeadershipController;
