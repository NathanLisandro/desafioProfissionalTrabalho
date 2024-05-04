import { Character } from '../../models/character.model';
import CharacterService from '../../services/characterService';

class CharacterServiceMock {
    private characters: Character[];

    constructor() {
        this.characters = [
            { id: 1, nome: 'Spider-Man', descricao: 'teste', imagem_url: 'c3BpZGVybWFu' }
        ];
    }

    async getAllCharacters(): Promise<Character[]> {
        return Promise.resolve(this.characters);
    }

    async getCharacterById(id: number): Promise<Character | null> {
        const character = this.characters.find(c => c.id === id);
        return Promise.resolve(character || null);
    }

    async insertCharacter(nome: string, imagem_url: string): Promise<number | null> {
        const newId = this.characters.length + 1;
        this.characters.push({ id: newId, nome, descricao: '', imagem_url }); 
        return Promise.resolve(newId);
    }

    async updateCharacter(id: number, nome: string, imagem_url: string): Promise<boolean> {
        const index = this.characters.findIndex(c => c.id === id);
        if (index !== -1) {
            this.characters[index] = { id, nome, descricao: '', imagem_url }; 
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    async deleteCharacter(id: number): Promise<boolean> {
        const initialLength = this.characters.length;
        this.characters = this.characters.filter(c => c.id !== id);
        return Promise.resolve(this.characters.length < initialLength);
    }
}
export default CharacterServiceMock