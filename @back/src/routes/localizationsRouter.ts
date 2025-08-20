import { Router } from 'express';
import { localizationsController } from "../app/Controllers/localizationsController.js";

const localizationsRouter = Router();

localizationsRouter.get('/api/locations', localizationsController.index);
localizationsRouter.get('/api/locations/:id', localizationsController.show);

export { localizationsRouter };
