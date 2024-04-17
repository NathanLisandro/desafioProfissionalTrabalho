import axios from 'axios';
import mysql from 'mysql';
import crypto from 'crypto';
import { Request, Response } from 'express';

const publicKey = 'b7cd9c62bb9bb00d6460c2b86ec9a20c';
const privateKey = '2b216d5499c7d29e57f2a0e43b103238b52eade3';
const ts = 1245
const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

const marvelAPI = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
});

class MarvelController {
    connection: any;

    async getComics(req: Request, res: Response) {
        try {
            const comics = await this.getMarvelData();
            res.json(comics);
        } catch (error) {
            console.error('Erro ao obter quadrinhos da Marvel:', error);
            res.status(500).json({ error: 'Erro ao obter quadrinhos da Marvel' });
        }
    }

    async getMarvelData() {
        try {
            const response = await marvelAPI.get('/comics/1590?ts=1254&apikey=b7cd9c62bb9bb00d6460c2b86ec9a20c&hash=5939850cbd718bc3988181d18f3b3749');
            const comics = response.data.results;
            return comics;
        } catch (error) {
            console.error('Erro ao obter dados da Marvel API:', error);
            return [];
        }
    }

    async fillDatabase() {
        try {
            const comics = await this.getMarvelData();
            if (comics.length > 0) {
                for (const comic of comics) {
                    const { title, description, dates, thumbnail, creators } = comic;
                    const date = new Date(dates[0].date);
                    await new Promise<void>((resolve, reject) => {
                        this.connection.query('INSERT INTO Quadrinhos (titulo, descricao, data_publicacao, capa_url) VALUES (?, ?, ?, ?)',
                            [title, description, date, thumbnail.path + '.' + thumbnail.extension],
                            (error: any, results: any) => {
                                if (error) reject(error);
                                console.log('Quadrinho inserido com sucesso:', results.insertId);
                                creators.items.forEach((creator: any) => {
                                    this.connection.query('INSERT INTO Criadores (nome, funcao, quadrinho_id) VALUES (?, ?, ?)',
                                        [creator.name, creator.role, results.insertId],
                                        (error: any, results: any) => {
                                            if (error) reject(error);
                                            console.log('Criador inserido com sucesso:', results.insertId);
                                            resolve();
                                        });
                                });
                            });
                    });
                }
            } else {
                console.log('Nenhum quadrinho encontrado para a saga selecionada.');
            }
        } catch (error) {
            console.error('Erro ao preencher o banco de dados:', error);
        }
    }
}

export default MarvelController;
