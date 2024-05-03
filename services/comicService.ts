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


    static async getAllComics(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            ComicService.connection.query('SELECT * FROM Quadrinhos', (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao buscar quadrinhos:', error);
                    reject([]);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getComicById(id: number): Promise<any | null> {
        return new Promise<any | null>((resolve, reject) => {
            ComicService.connection.query('SELECT * FROM Quadrinhos WHERE id = ?', [id], (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao buscar quadrinho por ID:', error);
                    reject(null);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    static async createComic(title: string,  publication_date: Date, cover_url: string): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            ComicService.connection.query(
                'INSERT INTO Quadrinhos (titulo, data_publicacao, capa_url) VALUES (?, ?, ?, ?)',
                [title, publication_date, cover_url],
                (error: MysqlError | null, results: any) => {
                    if (error) {
                        console.error('Erro ao inserir quadrinho:', error);
                        reject(null);
                    } else {
                        console.log('Quadrinho inserido com sucesso:', results.insertId);
                        resolve(results.insertId);
                    }
                }
            );
        });
    }

    static async updateComic(id: number, title: string, publication_date: Date, cover_url: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            ComicService.connection.query(
                'UPDATE Comics SET titulo = ?, data_publicacao = ?, capa = ? WHERE id = ?',
                [title, publication_date, cover_url, id],
                (error: MysqlError | null) => {
                    if (error) {
                        console.error('Erro ao atualizar quadrinho:', error);
                        reject(false);
                    } else {
                        console.log('Quadrinho atualizado com sucesso');
                        resolve(true);
                    }
                }
            );
        });
    }

    static async deleteComic(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            ComicService.connection.query('DELETE FROM Quadrinhos WHERE id = ?', [id], (error: MysqlError | null) => {
                if (error) {
                    console.error('Erro ao deletar quadrinho:', error);
                    reject(false);
                } else {
                    console.log('Quadrinho deletado com sucesso');
                    resolve(true);
                }
            });
        });
    }
}


