<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha API de Quadrinhos</title>
</head>
<body>

<h1> API de Quadrinhos</h1>

<p>Esta é uma API para gerenciar quadrinhos, personagens e criadores relacionados ao mundo dos quadrinhos.</p>

<h2>Funcionalidades</h2>

<ul>
    <li><strong>Quadrinhos</strong>:
        <ul>
            <li>Listar todos os quadrinhos</li>
            <li>Buscar um quadrinho por ID</li>
            <li>Criar um novo quadrinho</li>
            <li>Atualizar um quadrinho existente</li>
            <li>Deletar um quadrinho existente</li>
        </ul>
    </li>
    <li><strong>Personagens</strong>:
        <ul>
            <li>Listar todos os personagens</li>
            <li>Buscar um personagem por ID</li>
            <li>Criar um novo personagem</li>
            <li>Atualizar um personagem existente</li>
            <li>Deletar um personagem existente</li>
        </ul>
    </li>
    <li><strong>Criadores</strong>:
        <ul>
            <li>Listar todos os criadores</li>
            <li>Buscar um criador por ID</li>
            <li>Criar um novo criador</li>
            <li>Atualizar um criador existente</li>
            <li>Deletar um criador existente</li>
        </ul>
    </li>
</ul>

<h2>Endpoints</h2>

<h3>Quadrinhos</h3>
<ul>
    <li><code>GET /comics</code>: Listar todos os quadrinhos</li>
    <li><code>GET /comics/{id}</code>: Buscar um quadrinho por ID</li>
    <li><code>POST /comics</code>: Criar um novo quadrinho</li>
    <li><code>PUT /comics/{id}</code>: Atualizar um quadrinho existente</li>
    <li><code>DELETE /comics/{id}</code>: Deletar um quadrinho existente</li>
</ul>

<h3>Personagens</h3>
<ul>
    <li><code>GET /characters</code>: Listar todos os personagens</li>
    <li><code>GET /characters/{id}</code>: Buscar um personagem por ID</li>
    <li><code>POST /characters</code>: Criar um novo personagem</li>
    <li><code>PUT /characters/{id}</code>: Atualizar um personagem existente</li>
    <li><code>DELETE /characters/{id}</code>: Deletar um personagem existente</li>
</ul>

<h3>Criadores</h3>
<ul>
    <li><code>GET /creators</code>: Listar todos os criadores</li>
    <li><code>GET /creators/{id}</code>: Buscar um criador por ID</li>
    <li><code>POST /creators</code>: Criar um novo criador</li>
    <li><code>PUT /creators/{id}</code>: Atualizar um criador existente</li>
    <li><code>DELETE /creators/{id}</code>: Deletar um criador existente</li>
</ul>
<h3>Preenchimento do banco de dados</h3>
<ul>
    <li><code>POST /fill-database</code>: Preenche o banco de dados de acordo com o id do quadrinho que for solicitado</li>
</ul>
</body>
</html>
