import { OkPacket, RowDataPacket } from 'mysql2/promise';
import request from 'supertest';
import app from '../app';
import { createPool, Pool, PoolConnection } from 'mysql2/promise';
describe('Testando as rotas da API', () => {
    let connection: Pool;
    let characterId: number; 

    beforeAll(async () => {
        connection = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional',
        });

        const [rows] = await connection.execute<RowDataPacket[]>('SELECT id FROM Personagens LIMIT 1');
        if (rows && rows.length > 0) {
            characterId = rows[0].id;
        } else {
            console.error('Nenhum personagem encontrado no banco de dados. Inserindo novo personagem...');
            const [insertResult] = await connection.execute<OkPacket>('INSERT INTO Personagens (nome, imagem_url) VALUES (?, ?)', ['Novo Personagem', 'http://example.com/image.jpg']);
            if (insertResult && insertResult.insertId) {
                characterId = insertResult.insertId;
            } else {
                console.error('Falha ao inserir novo personagem no banco de dados.');
            }
        }
    });

    afterAll(async () => {
        await connection.end();
    });

    beforeEach(async () => {
        const conn: PoolConnection = await connection.getConnection();
    });

    it('Deve retornar todos os personagens', async () => {
        const response = await request(app).get('/characters');
        expect(response.status).toBe(200);
    });

    it('Deve retornar um personagem específico pelo ID', async () => {
  
        const response = await request(app).get(`/characters/${characterId}`);
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo personagem', async () => {
        const newCharacter = {
            name: 'Novo Personagem',
            description: 'Descrição do Novo Personagem',
            image_url: 'http://example.com/image.jpg',
        };
        const response = await request(app)
            .post('/characters')
            .send(newCharacter);
        expect(response.status).toBe(201);
    });

    it('Deve atualizar um personagem específico pelo ID', async () => {

        const updatedCharacter = {
            "nome": "teste",
            "imagem_url": "teste"
        };
        const response = await request(app)
            .put(`/characters/${characterId}`)
            .send(updatedCharacter);
        expect(response.status).toBe(200);
    });

    it('Deve deletar um personagem específico pelo ID', async () => {

        const response = await request(app).delete(`/characters/${characterId}`);
        expect(response.status).toBe(200);
    });
});
