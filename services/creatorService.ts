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

    static async getAllCreators(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            CreatorService.connection.query('SELECT * FROM Criadores', (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao listar os criadores:', error);
                    reject([]);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getCreatorById(id: number): Promise<any | null> {
        return new Promise<any | null>((resolve, reject) => {
            CreatorService.connection.query('SELECT * FROM Criadores WHERE id = ?', [id], (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao buscar o criador pelo ID:', error);
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

    static async updateCreator(id: number, nome: string, funcao: string, idQuadrinho: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            CreatorService.connection.query(
                'UPDATE Criadores SET nome = ?, funcao = ?, quadrinho_id = ? WHERE id = ?',
                [nome, funcao, idQuadrinho, id],
                (error: MysqlError | null, results: any) => {
                    if (error) {
                        console.error('Erro ao atualizar o criador:', error);
                        reject(false);
                    } else {
                        if (results.affectedRows > 0) {
                            console.log('Criador atualizado com sucesso');
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
            );
        });
    }

    static async deleteCreator(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            CreatorService.connection.query('DELETE FROM Criadores WHERE id = ?', [id], (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao deletar o criador:', error);
                    reject(false);
                } else {
                    if (results.affectedRows > 0) {
                        console.log('Criador deletado com sucesso');
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
