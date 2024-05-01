// creatorController.ts
import { Request, Response } from 'express';
import { CreatorService } from '../services/creatorService';

export class CreatorController {
    static async createCreator(req: Request, res: Response) {
        const { name, role, comicId } = req.body;

        try {
            await CreatorService.insertCreator(name, role, comicId);
            res.status(201).json({ message: 'Criador criado com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar criador:', error);
            res.status(500).json({ error: 'Erro ao criar criador.' });
        }
    }
}
