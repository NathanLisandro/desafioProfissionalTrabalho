export default class CreatorServiceMock {
    private creators: any[];

    constructor() {
        this.creators = [
            { id: 1, nome: 'Writer 1', role: 'Writer', comicId: 1 },
            { id: 2, nome: 'Artist 1', role: 'Artist', comicId: 1 },
            { id: 3, nome: 'Writer 2', role: 'Writer', comicId: 2 },
            { id: 4, nome: 'Artist 2', role: 'Artist', comicId: 2 },
        ];
    }

    async insertCreator(name: string, role: string, comicId: number): Promise<void> {
        const newId = this.creators.length + 1;
        this.creators.push({ id: newId, nome: name, role: role, comicId: comicId });
        return Promise.resolve();
    }

    async getAllCreators(): Promise<any[]> {
        return Promise.resolve(this.creators);
    }

    async getCreatorById(id: number): Promise<any | null> {
        const creator = this.creators.find(c => c.id === id);
        return Promise.resolve(creator || null);
    }

    async updateCreator(id: number, nome: string, role: string, comicId: number): Promise<boolean> {
        const index = this.creators.findIndex(c => c.id === id);
        if (index !== -1) {
            this.creators[index] = { id, nome, role, comicId };
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    async deleteCreator(id: number): Promise<boolean> {
        const initialLength = this.creators.length;
        this.creators = this.creators.filter(c => c.id !== id);
        return Promise.resolve(this.creators.length < initialLength);
    }
}
