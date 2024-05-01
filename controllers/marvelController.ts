import axios from 'axios';
import mysql from 'mysql';
import crypto from 'crypto';
import { ComicService } from '../services/comicService';
import { CreatorService } from '../services/creatorService';
import { Request, Response } from 'express';

const publicKey = 'b7cd9c62bb9bb00d6460c2b86ec9a20c';
const privateKey = '2b216d5499c7d29e57f2a0e43b103238b52eade3';
const ts = 1245
const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

const marvelAPI = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
});

class MarvelController {
    private static connection: mysql.Connection;

    public static setConnection(connection: mysql.Connection) {
        MarvelController.connection = connection;
    }


    async getMarvelData() {
        try {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/1590?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const comics = response.data?.data?.results;
            return comics || []; 
        } catch (error) {
            console.error('Erro ao obter dados da Marvel API:', error);
            return [];
        }
    }



    async fillDatabase(req: Request, res: Response) {
        try {
            const comics = await this.getMarvelData();
            if (comics.length === 0) {
                console.log('Nenhum quadrinho encontrado para a saga selecionada.');
                return res.status(404).json({ message: 'Nenhum quadrinho encontrado para a saga selecionada.' });
            }
    
            for (const comic of comics) {
                const { title, description, dates, thumbnail, creators } = comic;
                const date = new Date(dates[0].date);
    
                const comicId = await ComicService.insertComic(title, description, date, thumbnail);
    
                await Promise.all(creators.items.map(async (creator: any) => {
                    await CreatorService.insertCreator(creator.name, creator.role, comicId);
                }));
            }
    
            console.log('Banco de dados preenchido com sucesso.');
            res.status(200).json({ message: 'Banco de dados preenchido com sucesso.' });
        } catch (error) {
            console.error('Erro ao preencher o banco de dados:', error);
            res.status(500).json({ error: 'Erro ao preencher o banco de dados: ' });
        }
    }

}

export default MarvelController;
