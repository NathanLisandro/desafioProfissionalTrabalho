import { OkPacket, RowDataPacket } from 'mysql2/promise'; // Importar OkPacket e RowDataPacket diretamente do mysql2
import request from 'supertest';
import app from '../app';
import { createPool, Pool, PoolConnection } from 'mysql2/promise';
describe('Testando as rotas da API', () => {
    let connection: Pool;
    let characterId: number; // Variável para armazenar o ID do personagem

    beforeAll(async () => {
        connection = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional',
        });

        // Consulta ao banco de dados para obter o ID do primeiro personagem disponível
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT id FROM Personagens LIMIT 1');
        if (rows && rows.length > 0) {
            characterId = rows[0].id;
        } else {
            console.error('Nenhum personagem encontrado no banco de dados. Inserindo novo personagem...');
            // Inserir um novo personagem no banco de dados
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
        // Verifica se o ID do personagem está definido
        if (!characterId) {
            fail('ID do personagem não encontrado.');
        }

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
        // Verifica se o ID do personagem está definido
        if (!characterId) {
            fail('ID do personagem não encontrado.');
        }

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
        // Verifica se o ID do personagem está definido
        if (!characterId) {
            fail('ID do personagem não encontrado.');
        }

        const response = await request(app).delete(`/characters/${characterId}`);
        expect(response.status).toBe(200);
    });
});
