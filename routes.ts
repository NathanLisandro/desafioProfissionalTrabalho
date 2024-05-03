// routes.ts
import { Router } from 'express';
import MarvelController from './controllers/marvelController';
import CharacterService from './services/characterService';
import  ComicController  from './controllers/comicController';
import express, { Request, Response } from 'express';
import  CharacterController  from './controllers/characterController';
import CreatorController from './controllers/creatorController';

const router = Router();
const marvelController = new MarvelController();
const characterController = new CharacterController();
// rota para preencher o banco de dados
router.post('/fill-database', marvelController.fillDatabase.bind(marvelController));

// Rotas para a entidade Comic
router.get('/comics', ComicController.getAllComics);
router.get('/comics/:id', ComicController.getComicById);
router.post('/comics', ComicController.createComic);
router.put('/comics/:id', ComicController.updateComic);
router.delete('/comics/:id', ComicController.deleteComic);

// Rotas para Personagens
router.get('/characters', characterController.getAllCharacters);
router.get('/characters/:id', characterController.getCharacterById);
router.post('/characters', characterController.insertCharacter);
router.put('/characters/:id', characterController.updateCharacter);
router.delete('/characters/:id', characterController.deleteCharacter);

// rotas para os criadores
router.post('/creators', CreatorController.createCreator);
router.get('/creators', CreatorController.getAllCreators);
router.get('/creators/:id', CreatorController.getCreatorById);
router.put('/creators/:id', CreatorController.updateCreator);
router.delete('/creators/:id', CreatorController.deleteCreator);

export { router as routes };
