import { Request, Response } from 'express';
import { CreatorService } from '../services/creatorService';

 class CreatorController {
    static async createCreator(req: Request, res: Response) {
        const { name, role, comicId } = req.body;

        try {
            await CreatorService.insertCreator(name, role, comicId);
            res.status(201).json({ mensagem: 'Criador criado com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar criador:', error);
            res.status(500).json({ erro: 'Erro ao criar criador.' });
        }
    }

    static async getAllCreators(req: Request, res: Response) {
        try {
            const creators = await CreatorService.getAllCreators();
            res.status(200).json(creators);
        } catch (error) {
            console.error('Erro ao obter criadores:', error);
            res.status(500).json({ erro: 'Erro ao obter criadores.' });
        }
    }

    static async getCreatorById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const creator = await CreatorService.getCreatorById(parseInt(id));
            if (creator) {
                res.status(200).json(creator);
            } else {
                res.status(404).json({ mensagem: 'Criador não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao obter criador por ID:', error);
            res.status(500).json({ erro: 'Erro ao obter criador por ID.' });
        }
    }

    static async updateCreator(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, funcao, idQuadrinho } = req.body;

        try {
            const success = await CreatorService.updateCreator(parseInt(id), nome, funcao, idQuadrinho);
            if (success) {
                res.status(200).json({ mensagem: 'Criador atualizado com sucesso.' });
            } else {
                res.status(404).json({ mensagem: 'Criador não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao atualizar criador:', error);
            res.status(500).json({ erro: 'Erro ao atualizar criador.' });
        }
    }

    static async deleteCreator(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const success = await CreatorService.deleteCreator(parseInt(id));
            if (success) {
                res.status(200).json({ mensagem: 'Criador deletado com sucesso.' });
            } else {
                res.status(404).json({ mensagem: 'Criador não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao deletar criador:', error);
            res.status(500).json({ erro: 'Erro ao deletar criador.' });
        }
    }
}
export default CreatorController;