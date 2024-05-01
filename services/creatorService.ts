// creatorService.ts
import mysql, { MysqlError } from 'mysql';

export class CreatorService {
    private static connection: mysql.Connection;

    static setConnection(connection: mysql.Connection) {
        CreatorService.connection = connection;
    }

    static async insertCreator(name: string, role: string, comicId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            CreatorService.connection.query('INSERT INTO Criadores (nome, funcao, quadrinho_id) VALUES (?, ?, ?)',
                [name, role, comicId],
                (error: MysqlError | null, results: any) => {
                    if (error) reject(error);
                    console.log('Criador inserido com sucesso:', results.insertId);
                    resolve();
                });
        });
    }
}
