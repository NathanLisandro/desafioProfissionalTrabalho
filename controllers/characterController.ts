import { Request, Response } from 'express';
import CharacterService from '../services/characterService'; 

class CharacterController {


     async insertCharacter(req: Request, res: Response): Promise<void> {
        try {
            const { nome, imagem_url } = req.body;
            const newCharacter = await CharacterService.insertCharacter(nome, imagem_url);

            if (newCharacter) {
                res.status(201).json(newCharacter);
            } else {
                res.status(500).json({ error: 'Erro ao inserir personagem' });
            }
        } catch (error) {
            console.error('Erro ao inserir personagem:', error);
            res.status(500).json({ error: 'Erro ao inserir personagem' });
        }
    }
    async getAllCharacters(req: Request, res: Response): Promise<void> {
        try {
            const characters = await CharacterService.getAllCharacters();
            res.status(200).json(characters);
        } catch (error) {
            console.error('Erro ao listar personagens:', error);
            res.status(500).json({ error: 'Erro ao listar personagens' });
        }
    }

    async getCharacterById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const character = await CharacterService.getCharacterById(parseInt(id));
            if (character) {
                res.status(200).json(character);
            } else {
                res.status(404).json({ message: 'Personagem não encontrado no banco de dados' });
            }
        } catch (error) {
            console.error('Erro ao listar o personagem pelo id:', error);
            res.status(500).json({ error: 'Erro ao listar o personagem pelo id' });
        }
    }



    async updateCharacter(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome, imagem_url } = req.body;
        try {
            const updatedCharacter = await CharacterService.updateCharacter(parseInt(id), nome, imagem_url);
            if (updatedCharacter) {
                res.status(200).json(updatedCharacter);
            } else {
                res.status(404).json({ message: 'Personagem não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao atualizar personagem:', error);
            res.status(500).json({ error: 'Erro ao atualizar personagem' });
        }
    }

    async deleteCharacter(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deletedCharacter = await CharacterService.deleteCharacter(parseInt(id));
            if (deletedCharacter) {
                res.status(200).json({ message: 'Personagem deletado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Personagem não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar personagem: ', error);
            res.status(500).json({ error: 'Erro ao deletar personagem' });
        }
    }

}
export default CharacterController;