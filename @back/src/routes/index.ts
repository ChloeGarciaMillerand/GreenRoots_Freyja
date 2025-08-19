import { Router } from 'express';
import { treesRouter } from "./treesRouter.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'GreenRoots API Server',
        version: '1.0.0',
        status: 'running'
    });
});

router.get('/home', (req, res) => {
    res.json({
        message: 'GreenRoots API Server GET "/home"',
        version: '1.0.0',
        status: 'running'
    });
});


router.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

router.use(treesRouter);

export { router };