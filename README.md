# Menu-API

API Menu, teste para Desenvolvedor Node.
API tem como função gerenciar um cardápio online!
:)

## Sobre:

Esta API possui as seguintes rotas:

1. POST /signUp --- Criação de usuário na DB. 
2. POST /auth/login --- Login do usuário, este que receberá um retorno: token(JWT).\
`Rotas autenticadas:` 
4. GET /category --- Recebimento de todas categorias disponíveis na DB
5. GET /product --- Recebimendo de todos produtos disponíveis na DB
6. GET /product/:id --- Recebimendo do produto de acordo com o Id na DB
7. POST /product --- Criação de um produto na DB
8. PATCH /product/:id --- Atualização de um produto na DB
9. DELETE /product/:id --- Remoção de um produto na DB

Principais tecnologias/bibliotecas/frameworks:

1. Typescript - Para tipagem estática, interfaces e classes. Em outras palavras, para maior segurança e previsibilidade.
2. Bcrypt - Criptografia para armazenar senhas com segurança usando funções hash e salt.
3. Node - Um ótimo ambiente de tempo de execução para criar aplicativos do lado do servidor escaláveis e eficientes com JS.
4. joi - É uma biblioteca de validação de dados que facilita a leitura do código e evita a adição de erros ou bugs no banco de dados.
5. JWT - Para autenticação de usuário segura e escalável.
6. MongoDB - Flexibilidade de esquema e suporte para operações em tempo real em dados não estruturados e semi-estruturados.
7. Mongoose - Solução direta e baseada em esquemas para modelagem de dados de aplicativos.

## How to run for development

1. Clone este repositório.
2. Instale todas as dependências.

```bash
npm i
```

3. Configure o arquivo `.env` usando o `.env.example`.

4. Se houver nescessidade de criação da `dist`, utilize: `npx tsc`

5. Inicie o servidor `mongo`, por exemplo: `mongod --dbpath ~/.mongo`

6. Execute o back-end em um ambiente de desenvolvimento:

```bash
npm run dev, npm run watch ou npm run redist
```



///Explicar sobre o formato de envio de cada ROTA