import { Router } from 'express';
import { localizationsController } from "../app/Controllers/localizationsController.js";

const localizationRouter = Router();

localizationRouter.get('/api/locations', localizationsController.index);
localizationRouter.get('/api/locations/:id', localizationsController.show);

export { localizationRouter };
