// comicService.ts
import axios from 'axios';
import crypto from 'crypto';
import mysql, { MysqlError } from 'mysql';

const publicKey = 'b7cd9c62bb9bb00d6460c2b86ec9a20c';
const privateKey = '2b216d5499c7d29e57f2a0e43b103238b52eade3';
const ts = 1245
const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

export class ComicService {
    private static connection: mysql.Connection;

    static setConnection(connection: mysql.Connection) {
        ComicService.connection = connection;
    }

    static async getComics(): Promise<any[]> {
        try {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/1590?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const comics = response.data?.data?.results;
            return comics || [];
        } catch (error) {
            console.error('Erro ao obter dados da Marvel API:', error);
            return [];
        }
    }

    static async insertComic(title: string, description: string, date: Date, thumbnail: any): Promise<number> {
        return new Promise((resolve, reject) => {
            ComicService.connection.query('INSERT INTO Quadrinhos (titulo, descricao, data_publicacao, capa_url) VALUES (?, ?, ?, ?)',
                [title, description, date, thumbnail.path + '.' + thumbnail.extension],
                (error: MysqlError | null, results: any) => {
                    if (error) reject(error);
                    console.log('Quadrinho inserido com sucesso:', results.insertId);
                    resolve(results.insertId);
                });
        });
    }
}
