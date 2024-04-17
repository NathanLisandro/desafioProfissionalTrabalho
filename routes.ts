// routes.ts
import { Router } from 'express';
import MarvelController from './marvelController';

const router = Router();
const marvelController = new MarvelController();

router.get('/fill-database',  (req, res) => {
    res.status(200).json(marvelController.getComics);
});

export { router as routes };
