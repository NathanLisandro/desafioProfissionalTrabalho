// comicController.ts
import { Request, Response } from 'express';
import { ComicService } from '../services/comicService';

export class ComicController {
    static async getComics(req: Request, res: Response) {
        try {
            const comics = await ComicService.getComics();
            res.json(comics);
        } catch (error) {
            console.error('Erro ao obter quadrinhos:', error);
            res.status(500).json({ error: 'Erro ao obter quadrinhos' });
        }
    }
}
