# Menu-API

API Menu, teste para Desenvolvedor Node.
API tem como função gerenciar um cardápio online!
:)

## Sobre:

Esta API possui as seguintes rotas:

1. POST /signUp --- Criação de usuário na DB. 
2. POST /auth/login --- Login do usuário, este que receberá um retorno: token(JWT).
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

## Como executar em desenvolvimento:

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
## Formato dos envios/retornos:

POST /signUp

1. Envio

```
{
    "email": "admin@gmail.com",
    "password": "admin12"
}
```

POST /auth/login

1. Envio

```
{
    "email": "admin@gmail.com",
    "password": "admin12"
}
```


```
{
  "user": "User \"admin@gmail.com\" created!"
}
```

2. Retorno

O token tem duração de 1h.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMyZjZjOTI2ZTIyMDI4OTM3MzhhNGEiLCJpYXQiOjE2ODEwNjI5NzksImV4cCI6MTY4MTA2NjU3OX0.bHQZRoDiOYY-6h_IvMGmtdVYuNtzyRGMXNGBTisKHnk"
}
```

GET /category

1. Retorno

```
[
  {
    "_id": "bebidas",
    "parent": null,
    "name": "Bebidas"
  },
  {
    "_id": "alcoolicas",
    "parent": "bebidas",
    "name": "Bebidas Alcoólicas"
  },
  {
    "_id": "nao-alcoolicas",
    "parent": "bebidas",
    "name": "Bebidas Não Alcoólicas"
  },
  {
    "_id": "comidas",
    "parent": null,
    "name": "Comidas"
  }
]
```


GET /product

1. Retorno

```
  {
    "_id": "642fc0da7e293a2cce660615",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Vinho Seco",
    "qty": 30,
    "price": 20.4,
    "__v": 0
  },
  {
    "_id": "64307f885b2e3e38560351da",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Vinho Tinto",
    "qty": 40,
    "price": 40.4,
    "__v": 0
  },
  {
    "_id": "64308040d0ce999029ae3774",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Pizza",
    "qty": 16,
    "price": 10,
    "__v": 0
  }
```

GET /product/:id

1. Retorno

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "comidas",
        "parent": null,
        "name": "Comidas"
      }
    ]
  ],
  "name": "Vinho Seco",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

POST /product

1. Envio

```
{
  "categories": [
      {
        "_id": "alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Alcoólicas"
      }
  ],
  "name": "Vinho de Cereja",
  "qty": 30,
  "price": 20.40
}
```
2. Retorno

```
{
  "categories": [
    [
      {
        "_id": "alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Alcoólicas"
      }
    ]
  ],
  "name": "Vinho de Cereja",
  "qty": 30,
  "price": 20.4,
  "_id": "6432ff9d69884021ee295254",
  "__v": 0
}
```


PATCH /product/:id

O envio de PATCH é bem diverso. Um campo não depende do outro para ser atualizado, sendo assim, você pode enviar apenas o "price", "qty", "categories", "categories.name", "name" e afins, por exemplo, e assim a estrutura será atualizada! Cada estrutura de atualização é independente!

1. Original

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "comidas",
        "parent": null,
        "name": "Comidas"
      }
    ]
  ],
  "name": "Vinho Seco",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

2. Envio

```
{
  "categories": [
      {
        "_id": "nao-alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Não Alcoólicas"
      }
  ],
  "name": "Água mineral"
}
```
3. Retorno

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "nao-alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Não Alcoólicas"
      }
    ]
  ],
  "name": "Água mineral",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

DELETE /product/:id

1. Retorno

```
{
  "deletedCount": "Product with id 642fc0da7e293a2cce660615 has been deleted"
}
```