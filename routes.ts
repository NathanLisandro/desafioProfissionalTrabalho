// routes.ts
import { Router } from 'express';
import MarvelController from './controllers/marvelController';

const router = Router();
const marvelController = new MarvelController();

router.post('/fill-database', marvelController.fillDatabase.bind(marvelController));

export { router as routes };
