import { Router } from 'express';
import MarvelController from './controllers/marvelController';

const marvelRoutes = Router();

const marvelController = new MarvelController();

// marvelRoutes.get('/characters', marvelController.getCharacters);
// marvelRoutes.get('/creators', marvelController.getCreators);

export { marvelRoutes };
