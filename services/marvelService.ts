import axios from 'axios';
import crypto from 'crypto';
import { ComicService } from '../services/comicService';
import { CreatorService } from '../services/creatorService';
import { Comic } from '../models/comic.model';
import { Creator } from '../models/creator.model';

const publicKey = 'b7cd9c62bb9bb00d6460c2b86ec9a20c';
const privateKey = '2b216d5499c7d29e57f2a0e43b103238b52eade3';
const ts = 1245;
const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

const marvelAPI = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
});

export class MarvelService {

    static async getMarvelData(): Promise<Comic[]> {
        try {
            const response = await marvelAPI.get(`http://gateway.marvel.com/v1/public/comics/1590?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const comicsData = response.data?.data?.results;
            const comics: Comic[] = [];

            for (const comicData of comicsData) {
                const { titulo, descricao, data_publicacao, capa_url } = comicData;
                const date = new Date(data_publicacao);
                const creatorsResponse = await this.getComicCreators(comicData.id); 
                const creators: Creator[] = creatorsResponse.data?.data?.results?.creators ?? [];
                
                comics.push({ titulo, descricao, data_publicacao: date, capa_url, creators });
            }

            return comics;
        } catch (error) {
            console.error('Erro ao obter dados da Marvel API:', error);
            return [];
        }
    }

    static async getComicCreators(comicId: number): Promise<any> {
        try {
            const response = await marvelAPI.get(`http://gateway.marvel.com/v1/public/comics/${comicId}/creators?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            return response;
        } catch (error) {
            console.error('Erro ao obter criadores do quadrinho:', error);
            return [];
        }
    }

    static async fillDatabase(): Promise<boolean> {
        try {
            const comics = await this.getMarvelData();
            if (comics.length === 0) {
                console.log('Nenhum quadrinho encontrado para a saga selecionada.');
                return false;
            }

            for (const comic of comics) {
                const { titulo, descricao, data_publicacao, capa_url, creators } = comic;

                const comicId = await ComicService.insertComic(titulo, descricao, data_publicacao, capa_url);

                await Promise.all(creators.map(async (creator: Creator) => {
                    await CreatorService.insertCreator(creator.nome, creator.funcao, comicId);
                }));
            }

            console.log('Banco de dados preenchido com sucesso.');
            return true;
        } catch (error) {
            console.error('Erro ao preencher o banco de dados:', error);
            return false;
        }
    }
}
