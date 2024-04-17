// routes.ts
import { Router } from 'express';
import MarvelController from './marvelController';

const router = Router();
const marvelController = new MarvelController();

router.post('/fill-database', marvelController.fillDatabase) 


export { router as routes };
