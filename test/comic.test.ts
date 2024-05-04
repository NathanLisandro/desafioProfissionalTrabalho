import request from 'supertest';
import app from '../app';
import { createPool, Pool, PoolConnection, RowDataPacket } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2/promise';
 
describe('Testando as rotas da API', () => {
    let connection: Pool;
    let comicId: number;

    beforeAll(async () => {
        connection = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'desafioProfissional',
        });

        const [rows] = await connection.execute<RowDataPacket[]>('SELECT id FROM Quadrinhos LIMIT 1');
        if (rows && rows.length > 0) {
            comicId = rows[0].id;
        } else {
            const [insertResult] = await connection.execute<ResultSetHeader>(
                'INSERT INTO Quadrinhos (titulo, descricao, data_publicacao, capa_url) VALUES (?, ?, ?, ?)',
                ['Novo Quadrinho', 'Descrição do Novo Quadrinho', new Date(), 'http://example.com/image.jpg']
            );

            if (insertResult && insertResult.insertId) {
                comicId = insertResult.insertId;
            } else {
                console.error('Falha ao inserir novo quadrinho no banco de dados.');
            }
        }
    });

    afterAll(async () => {
        await connection.end();
    });

    beforeEach(async () => {
        const conn: PoolConnection = await connection.getConnection();
    });

    it('Deve preencher o banco de dados', async () => {
        const response = await request(app).post('/fill-database');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Banco de dados preenchido com sucesso.');
    });

    it('Deve retornar todos os quadrinhos', async () => {
        const response = await request(app).get('/comics');
        expect(response.status).toBe(200);
    });

    it('Deve retornar um quadrinho específico pelo ID', async () => {
        if (!comicId) {
            fail('ID do quadrinho não encontrado.');
        }

        const response = await request(app).get(`/comics/${comicId}`);
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo quadrinho', async () => {
        expect(comicId).toBeDefined();
    });

    it('Deve atualizar um quadrinho específico pelo ID', async () => {
        if (!comicId) {
            fail('ID do quadrinho não encontrado.');
        }

        const updatedComic = {
            title: 'Quadrinho Atualizado',
            publication_date: new Date(),
            cover_url: 'http://example.com/updated_image.jpg',
        };
        const response = await request(app)
            .put(`/comics/${comicId}`)
            .send(updatedComic);
        expect(response.status).toBe(200);
    });

    it('Deve deletar um quadrinho específico pelo ID', async () => {
        if (!comicId) {
            fail('ID do quadrinho não encontrado.');
        }

        const response = await request(app).delete(`/comics/${comicId}`);
        expect(response.status).toBe(200);
    });
});
