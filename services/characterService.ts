import mysql, { MysqlError } from 'mysql';
import { Character } from '../models/character.model';

class CharacterService {
    private static connection: mysql.Connection;

    static setConnection(connection: mysql.Connection) {
        CharacterService.connection = connection;
    }

   
    static async getAllCharacters(): Promise<Character[]> {
        return new Promise<Character[]>((resolve, reject) => {
            CharacterService.connection.query('SELECT * FROM Personagens', (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao listar os personagens:', error);
                    reject([]);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getCharacterById(id: number): Promise<Character | null> {
        return new Promise<Character | null>((resolve, reject) => {
            CharacterService.connection.query('SELECT * FROM Personagens WHERE id = ?', [id], (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao buscar o personagem pelo id: ', error);
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

   static async insertCharacter(nome: string, imagem_url: string): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            CharacterService.connection.query(
                'INSERT INTO Personagens (nome, imagem_url) VALUES (?, ?)',
                [nome, imagem_url],
                (error: MysqlError | null, results: any) => {
                    if (error) {
                        console.error('Erro ao inserir o personagem: ', error);
                        reject(null);
                    } else {
                        console.log('Personagem inserido com sucesso: ', results.insertId);
                        resolve(results.insertId);
                    }
                }
            );
        });
    }

    static async updateCharacter(id: number, nome: string, imagem_url: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            CharacterService.connection.query(
                'UPDATE Personagens SET nome = ?, imagem_url = ? WHERE id = ?',
                [nome, imagem_url, id],
                (error: MysqlError | null, results: any) => {
                    if (error) {
                        console.error('Erro ao atualizar: ', error);
                        reject(false);
                    } else {
                        if (results.affectedRows > 0) {
                            console.log('Personagem atualizado com sucesso');
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
            );
        });
    }

 static  async deleteCharacter(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            CharacterService.connection.query('DELETE FROM Personagens WHERE id = ?', [id], (error: MysqlError | null, results: any) => {
                if (error) {
                    console.error('Erro ao deletar o personagem: ', error);
                    reject(false);
                } else {
                    if (results.affectedRows > 0) {
                        console.log('Personagem deletado com sucesso');
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }


}

export default CharacterService;
