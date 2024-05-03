// comicController.ts
import { Request, Response } from 'express';
import { ComicService } from '../services/comicService';

class ComicController {
    static async getAllComics(req: Request, res: Response): Promise<void> {
        try {
            const comics = await ComicService.getAllComics();
            res.status(200).json(comics);
        } catch (error) {
            console.error('Erro ao buscar todos os quadrinhos:', error);
            res.status(500).json({ error: 'Erro ao buscar todos os quadrinhos' });
        }
    }

    static async getComicById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const comic = await ComicService.getComicById(id);
            if (comic) {
                res.status(200).json(comic);
            } else {
                res.status(404).json({ error: 'Quadrinho não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao buscar quadrinho por ID:', error);
            res.status(500).json({ error: 'Erro ao buscar quadrinho por ID' });
        }
    }

    static async createComic(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, publication_date, cover_url } = req.body;
            const newComicId = await ComicService.createComic(title, publication_date, cover_url);
            if (newComicId) {
                res.status(201).json({ id: newComicId });
            } else {
                res.status(500).json({ error: 'Erro ao criar quadrinho' });
            }
        } catch (error) {
            console.error('Erro ao criar quadrinho:', error);
            res.status(500).json({ error: 'Erro ao criar quadrinho' });
        }
    }

    static async updateComic(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { title, description, publication_date, cover_url } = req.body;
            const success = await ComicService.updateComic(id, title, publication_date, cover_url);
            if (success) {
                res.status(200).json({ message: 'Quadrinho atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Quadrinho não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao atualizar quadrinho:', error);
            res.status(500).json({ error: 'Erro ao atualizar quadrinho' });
        }
    }

    static async deleteComic(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await ComicService.deleteComic(id);
            if (success) {
                res.status(200).json({ message: 'Quadrinho deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Quadrinho não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar quadrinho:', error);
            res.status(500).json({ error: 'Erro ao deletar quadrinho' });
        }
    }
}
export default ComicController;
