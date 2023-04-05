# menu-API

API Menu, test for Node Developer.

:)

## About

This API has the following routes:

POST /auth/login:
GET /category:
GET /product:
GET /product:id:
POST /product:
PATCH /product/:id:
DELETE /product:id:

Main technologies/Libs/Frameworks:

Typescript - For static typing, interfaces, and classes. In other words, for greater security and predictability.
Bcrypt - Cryptography for securely storing passwords using hash and salt functions.
Node - A great runtime environment for creating scalable and efficient server-side applications with JS.
joi - It's a data validation library that facilitates code reading and prevents the addition of errors or bugs in the database.
JWT - For secure and scalable user authentication.
MongoDB - Schema flexibility and support for real-time operations on unstructured and semi-structured data.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a MongoDB database with whatever name you want
4. Configure the `.env` file using the `.env.example` 

5. Run the back-end in a development environment:

```bash
npm run dev
```
