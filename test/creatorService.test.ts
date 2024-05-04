import CreatorServiceMock from './mocks/creatorService.mock';

describe('CreatorService', () => {
    let creatorService: CreatorServiceMock;

    beforeEach(() => {
        creatorService = new CreatorServiceMock();
    });

    it('deve inserir um novo criador', async () => {
        const newCreatorName = 'New Creator';
        const newCreatorRole = 'Writer';
        const newComicId = 3;

        await creatorService.insertCreator(newCreatorName, newCreatorRole, newComicId);

        const allCreators = await creatorService.getAllCreators();
        const newCreator = allCreators.find(creator => creator.nome === newCreatorName && creator.role === newCreatorRole && creator.comicId === newComicId);
        expect(newCreator).toBeDefined();
    });

    it('deve retornar todos os criadores', async () => {
        const creators = await creatorService.getAllCreators();
        expect(creators.length).toBeGreaterThan(0);
    });

    it('deve retornar um criador pelo ID', async () => {
        const creatorId = 1;
        const creator = await creatorService.getCreatorById(creatorId);
        expect(creator).toBeDefined();
        expect(creator!.id).toBe(creatorId);
    });

    it('deve atualizar um criador pelo ID', async () => {
        const creatorId = 1;
        const updatedCreatorName = 'Updated Creator';
        const updatedCreatorRole = 'Artist';
        const updatedComicId = 1;

        const updated = await creatorService.updateCreator(creatorId, updatedCreatorName, updatedCreatorRole, updatedComicId);
        expect(updated).toBeTruthy();

        const updatedCreator = await creatorService.getCreatorById(creatorId);
        expect(updatedCreator).toBeDefined();
        expect(updatedCreator!.nome).toBe(updatedCreatorName);
        expect(updatedCreator!.role).toBe(updatedCreatorRole);
        expect(updatedCreator!.comicId).toBe(updatedComicId);
    });

    it('deve deletar um criador pelo ID', async () => {
        const creatorId = 1;

        const deleted = await creatorService.deleteCreator(creatorId);
        expect(deleted).toBeTruthy();

        const deletedCreator = await creatorService.getCreatorById(creatorId);
        expect(deletedCreator).toBeNull();
    });
});
