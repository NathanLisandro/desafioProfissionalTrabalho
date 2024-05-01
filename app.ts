import express from 'express';
import mysql, { MysqlError } from 'mysql';
import { routes } from './routes';
import { marvelRoutes } from './marvelRoutes';
import MarvelController from './controllers/marvelController';
import { MarvelService } from './services/marvelService';
import { ComicController } from './controllers/ComicController';
import { ComicService } from './services/comicService';
import { CreatorService } from './services/creatorService';

class App {
    public express: express.Application;
    private dbConfig: mysql.ConnectionConfig;
    private connection: mysql.Connection;

    constructor() {
        this.express = express();
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional'
        };
        this.connection = mysql.createConnection(this.dbConfig);
        this.middleware();
        this.database();
        this.routes();
    }

    public middleware() {
        this.express.use(express.json());
    }

    public database() {
        this.connection = mysql.createConnection(this.dbConfig);
        this.connection.connect((err: MysqlError) => {
            if (err) {
                console.error('Erro ao conectar com o banco de dados:', err);
                return;
            }
            console.log('Conectado com o banco de dados MySQL');
            MarvelController.setConnection(this.connection);
            ComicService.setConnection(this.connection);
            CreatorService.setConnection(this.connection)
        });
    }

    public routes() {
        this.express.use(routes);
        this.express.use('/marvel', marvelRoutes);
    }
}

export default new App().express;
