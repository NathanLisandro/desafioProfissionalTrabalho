import app from './app';

function main() {
    const port = 3000;
    const host = 'localhost';

    app.listen(port, host, () => {
        console.log(`Servidor rodando em http://${host}:${port}`);
    });
}

main();
