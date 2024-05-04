import CharacterServiceMock from './mocks/characterService.mock';

describe('CharacterService', () => {
    let characterService: CharacterServiceMock;

    beforeEach(() => {
        characterService = new CharacterServiceMock();
    });

    it('deve retornar todos os personagens', async () => {
        const characters = await characterService.getAllCharacters();
        expect(characters.length).toBeGreaterThan(0);
    });

    it('deve retornar um personagem pelo ID', async () => {
        const characterId = 1;
        const character = await characterService.getCharacterById(characterId);
        expect(character).toBeDefined();
        expect(character!.id).toBe(characterId);
    });

    it('deve inserir um novo personagem', async () => {
        const newCharacterId = await characterService.insertCharacter('New Character', 'image-url');
        expect(newCharacterId).toBeDefined();
    });

    it('deve atualizar um personagem pelo ID', async () => {
        const characterId = 1;
        const updated = await characterService.updateCharacter(characterId, 'Updated Character', 'updated-image-url');
        expect(updated).toBeTruthy();
    });

    it('deve deletar um personagem pelo ID', async () => {
        const characterId = 1;
        const deleted = await characterService.deleteCharacter(characterId);
        expect(deleted).toBeTruthy();
    });
});
