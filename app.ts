import express from 'express';
import mysql, { MysqlError } from 'mysql';
import { routes } from './routes';
import { marvelRoutes } from './marvelRoutes';

class App {
    public express: express.Application;
    private dbConfig: mysql.ConnectionConfig;

    constructor() {
        this.express = express();
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional'
        };
        this.middleware();
        this.database();
        this.routes();
    }

    public middleware() {
        this.express.use(express.json());
    }

    public database() {
        const connection = mysql.createConnection(this.dbConfig);
        connection.connect((err: MysqlError) => {
            if (err) {
                console.error('Erro ao conectar com o banco de dados:', err);
                return;
            }
            console.log('Conectado com o banco de dados MySQL');
        });
    }

    public routes() {
        this.express.use(routes);
        this.express.use('/marvel', marvelRoutes);
    }
}

export default new App().express;
