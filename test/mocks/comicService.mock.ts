import mysql, { MysqlError } from 'mysql';

class ComicServiceMock {
    private static connection: mysql.Connection;
    private static comics: any[] = [];

    static setConnection(connection: mysql.Connection) {
        ComicServiceMock.connection = connection;
    }

    static async insertComic(title: string, description: string, date: Date, thumbnail: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const newComic = { id: ComicServiceMock.comics.length + 1, titulo: title, descricao: description, data_publicacao: date, capa_url: thumbnail.path + '.' + thumbnail.extension };
            ComicServiceMock.comics.push(newComic);
            resolve(newComic.id);
        });
    }

    static async getAllComics(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            resolve(ComicServiceMock.comics);
        });
    }

    static async getComicById(id: number): Promise<any | null> {
        return new Promise<any | null>((resolve, reject) => {
            const comic = ComicServiceMock.comics.find(comic => comic.id === id);
            resolve(comic || null);
        });
    }

    static async createComic(title: string, publication_date: Date, cover_url: string): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            const newComic = { id: ComicServiceMock.comics.length + 1, titulo: title, data_publicacao: publication_date, capa_url: cover_url };
            ComicServiceMock.comics.push(newComic);
            resolve(newComic.id);
        });
    }

    static async updateComic(id: number, title: string, publication_date: Date, cover_url: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const index = ComicServiceMock.comics.findIndex(comic => comic.id === id);
            if (index !== -1) {
                ComicServiceMock.comics[index] = { id, titulo: title, data_publicacao: publication_date, capa_url: cover_url };
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    static async deleteComic(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const initialLength = ComicServiceMock.comics.length;
            ComicServiceMock.comics = ComicServiceMock.comics.filter(comic => comic.id !== id);
            resolve(ComicServiceMock.comics.length < initialLength);
        });
    }
}
export default ComicServiceMock
