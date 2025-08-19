import { Router } from 'express';
import { treesRouter } from "./treesRouter.js";
import {adminRouter} from "./adminRouter.js";
import {cartRouter} from "./cartRouter.js";
import {authRouter} from "./authRouter.js";
import {ordersRouter} from "./ordersRouter.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'GreenRoots API Server',
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

router.use(authRouter);
router.use(treesRouter);
router.use(adminRouter);
router.use(cartRouter);
router.use(ordersRouter);

export { router };
