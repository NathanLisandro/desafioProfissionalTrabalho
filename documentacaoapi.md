 <h1>Documentação da API</h1>
    <h2>Quadrinhos</h2>
    <p>Endpoint para manipulação de quadrinhos.</p>
    <h3>GET /quadrinhos</h3>
    <p>Retorna todos os quadrinhos.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>[
        {
            "id": 1,
            "titulo": "Homem-Aranha",
            "descricao": "Descrição do Homem-Aranha",
            "data_publicacao": "2024-05-01",
            "capa_url": "http://example.com/homem-aranha.jpg"
        },
        {
            "id": 2,
            "titulo": "Batman",
            "descricao": "Descrição do Batman",
            "data_publicacao": "2024-05-02",
            "capa_url": "http://example.com/batman.jpg"
        }
    ]
    </code></pre>
    <p>Códigos de Resposta:</p>
    <ul>
        <li>200 - OK: Retorna os quadrinhos com sucesso.</li>
        <li>400 - Bad Request: Problemas com a solicitação.</li>
        <li>500 - Internal Server Error: Erro interno do servidor.</li>
    </ul>
    <h3>POST /quadrinhos</h3>
    <p>Cria um novo quadrinho.</p>
    <p>Payload:</p>
    <pre><code>{
        "titulo": "Novo Quadrinho",
        "descricao": "Descrição do Novo Quadrinho",
        "data_publicacao": "2024-05-03",
        "capa_url": "http://example.com/novo-quadrinho.jpg"
    }
    </code></pre>
    <p>Retorno: O ID do quadrinho criado.</p>
    <h3>GET /quadrinhos/:id</h3>
    <p>Retorna um quadrinho específico pelo ID.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>{
        "id": 1,
        "titulo": "Homem-Aranha",
        "descricao": "Descrição do Homem-Aranha",
        "data_publicacao": "2024-05-01",
        "capa_url": "http://example.com/homem-aranha.jpg"
    }
    </code></pre>
    <h3>PUT /quadrinhos/:id</h3>
    <p>Atualiza um quadrinho específico pelo ID.</p>
    <p>Payload:</p>
    <pre><code>{
        "titulo": "Novo Título do Quadrinho",
        "descricao": "Nova Descrição do Quadrinho",
        "data_publicacao": "2024-05-02",
        "capa_url": "http://example.com/nova-capa.jpg"
    }
    </code></pre>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h3>DELETE /quadrinhos/:id</h3>
    <p>Deleta um quadrinho específico pelo ID.</p>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h2>Personagens</h2>
    <p>Endpoint para manipulação de personagens.</p>
    <h3>GET /personagens</h3>
    <p>Retorna todos os personagens.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>[
        {
            "id": 1,
            "nome": "Homem-Aranha",
            "descricao": "Descrição do Homem-Aranha",
            "imagem_url": "http://example.com/homem-aranha.jpg"
        },
        {
            "id": 2,
            "nome": "Batman",
            "descricao": "Descrição do Batman",
            "imagem_url": "http://example.com/batman.jpg"
        }
    ]
    </code></pre>
    <p>Códigos de Resposta:</p>
    <ul>
        <li>200 - OK: Retorna os personagens com sucesso.</li>
        <li>400 - Bad Request: Problemas com a solicitação.</li>
        <li>500 - Internal Server Error: Erro interno do servidor.</li>
    </ul>
    <h3>POST /personagens</h3>
    <p>Cria um novo personagem.</p>
    <p>Payload:</p>
    <pre><code>{
        "nome": "Novo Personagem",
        "descricao": "Descrição do Novo Personagem",
        "imagem_url": "http://example.com/novo-personagem.jpg"
    }
    </code></pre>
    <p>Retorno: O ID do personagem criado.</p>
    <h3>GET /personagens/:id</h3>
    <p>Retorna um personagem específico pelo ID.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>{
        "id": 1,
        "nome": "Homem-Aranha",
        "descricao": "Descrição do Homem-Aranha",
        "imagem_url": "http://example.com/homem-aranha.jpg"
    }
    </code></pre>
    <h3>PUT /personagens/:id</h3>
    <p>Atualiza um personagem específico pelo ID.</p>
    <p>Payload:</p>
    <pre><code>{
        "nome": "Novo Nome do Personagem",
        "descricao": "Nova Descrição do Personagem",
        "imagem_url": "http://example.com/nova-imagem.jpg"
    }
    </code></pre>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h3>DELETE /personagens/:id</h3>
    <p>Deleta um personagem específico pelo ID.</p>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h2>Criadores</h2>
    <p>Endpoint para manipulação de criadores.</p>
    <h3>GET /criadores</h3>
    <p>Retorna todos os criadores.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>[
        {
            "id": 1,
            "nome": "Stan Lee",
            "funcao": "Roteirista",
            "quadrinho_id": 1
        },
        {
            "id": 2,
            "nome": "Steve Ditko",
            "funcao": "Desenhista",
            "quadrinho_id": 1
        }
    ]
    </code></pre>
    <p>Códigos de Resposta:</p>
    <ul>
        <li>200 - OK: Retorna os criadores com sucesso.</li>
        <li>400 - Bad Request: Problemas com a solicitação.</li>
        <li>500 - Internal Server Error: Erro interno do servidor.</li>
    </ul>
    <h3>POST /criadores</h3>
    <p>Cria um novo criador.</p>
    <p>Payload:</p>
    <pre><code>{
        "nome": "Novo Criador",
        "funcao": "Nova Função",
        "quadrinho_id": 1
    }
    </code></pre>
    <p>Retorno: O ID do criador criado.</p>
    <h3>GET /criadores/:id</h3>
    <p>Retorna um criador específico pelo ID.</p>
    <p>Exemplo de retorno:</p>
    <pre><code>{
        "id": 1,
        "nome": "Stan Lee",
        "funcao": "Roteirista",
        "quadrinho_id": 1
    }
    </code></pre>
    <h3>PUT /criadores/:id</h3>
    <p>Atualiza um criador específico pelo ID.</p>
    <p>Payload:</p>
    <pre><code>{
        "nome": "Novo Nome do Criador",
        "funcao": "Nova Função do Criador",
        "quadrinho_id": 1
    }
    </code></pre>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h3>DELETE /criadores/:id</h3>
    <p>Deleta um criador específico pelo ID.</p>
    <p>Retorno: Sucesso ou falha da operação.</p>
    <h2>Preenchimento do banco de dados!</h2>
    <h3>POST /fill-database</h3>
    <p>Preenche o banco de dados com dados iniciais.</p>
    <p>Retorno: Sucesso ou falha da operação.</p>