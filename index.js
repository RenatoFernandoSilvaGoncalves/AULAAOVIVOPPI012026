import express from 'express';


const porta = 3000;
const host = "0.0.0.0"; // acesso a todas as interfaces de rede no host local

const app = express(); // cria o servidor HTTP

//definir a biblioteca que irá automaticamente processar os parâmetros da url para nós
app.use(express.urlencoded({ extended: true }));

app.get("/", (requisicao, resposta) => {
    resposta.write(`
        <html>
            <head>
                <title>Primeiros passos com NodeJS</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Primeiros passos com NodeJS</h1>
                <h2>Página inicial</h2>
            </body>
        </html>
    `);
    resposta.end();
});

app.get("/dinheiro", (requisicao, resposta) => {
    resposta.write(`
        <html>
            <head>
                <title>R$ 200,00</title>
            </head>
            <body>
                <img src='https://blog.tecnospeed.com.br/wp-content/uploads/2021/08/10195119/Template-Capa_BlogTecnoSpeed-2.png'/>
            </body>
        </html>`);
    resposta.end();

})

//quem solicita um recurso de uma aplicação poderá, via url, especificar parâmetros, de modo a especializar a requisição
//informar para o servidor o número limite da contagem
app.get("/contagem", (requisicao, resposta) => {
    const limiteInicial = requisicao.query.limiteInicial;
    const limiteFinal = requisicao.query.limiteFinal;
    if (limiteInicial == undefined || limiteFinal == undefined) {
        resposta.write(`<p>Contagem indefinida</p>`);
        resposta.write(`<p>Especifique na url o limite da contagem</p>`);
        resposta.write(`<p>Exemplo: http://localhost:3000/contagem?limiteInicial=10&limiteFinal=20</p>`);
        resposta.end();
    }
    else {
        for (let i = limiteInicial; i <= limiteFinal; i++){
            resposta.write(`<p>${i}</p>`);    
        }
        resposta.write(`<p>Fim da contagem</p>`);
        resposta.end();
    }
});


app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);
});