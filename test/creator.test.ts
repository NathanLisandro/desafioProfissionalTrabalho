import request from 'supertest';
import app from '../app';
import { createPool, Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

describe('Testando as rotas da API', () => {
    let connection: Pool;
    let creatorId: number;

    beforeAll(async () => {
        connection = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional',
        });
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT id FROM Criadores LIMIT 1');
        if (rows && rows.length > 0) {
            creatorId = rows[0].id;
        } else {
            const newCreator = {
                name: 'Novo Criador',
                role: 'Função do Novo Criador',
                comic_id: 1,
            };
            const [insertResult] = await connection.execute<ResultSetHeader>('INSERT INTO Criadores (nome, role, comic_id) VALUES (?, ?, ?)', [newCreator.name, newCreator.role, newCreator.comic_id]);
            if (insertResult && insertResult.insertId) {
                creatorId = insertResult.insertId;
            } else {
                console.error('Falha ao inserir novo criador no banco de dados.');
            }
        }
    });

    afterAll(async () => {
        await connection.end();
    });

    beforeEach(async () => {
        const conn: PoolConnection = await connection.getConnection();
    });
    it('Deve retornar todos os criadores', async () => {
        const response = await request(app).get('/creators');
        expect(response.status).toBe(200);
    });

    it('Deve retornar um criador específico pelo ID', async () => {
        const response = await request(app).get(`/creators/${creatorId}`);
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo criador', async () => {
        const newCreator = {
            name: 'Novo Criador',
            role: 'Função do Novo Criador',
            comic_id: 1,
        };
        const response = await request(app)
            .post('/creators')
            .send(newCreator);
        expect(response.status).toBe(201);
    });

    it('Deve atualizar um criador específico pelo ID', async () => {
        const updatedCreator = {
            name: 'Criador Atualizado',
            role: 'Nova Função do Criador Atualizado',
            comic_id: 2,
        };
        const response = await request(app)
            .put(`/creators/${creatorId}`)
            .send(updatedCreator);
        expect(response.status).toBe(200);
    });

    it('Deve deletar um criador específico pelo ID', async () => {
        const response = await request(app).delete(`/creators/${creatorId}`);
        expect(response.status).toBe(200);
    });

});

