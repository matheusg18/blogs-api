# Blogs API

## Contexto

Blogs API é uma API REST de um sistema de blog onde é possível se registrar, fazer login, fazer o CRUD de um post e definir categorias que serão usadas nos posts. Esta API faz uso do JWT para gerenciamento de sessão.

Feito utilizando a arquitetura MSC e coberto por testes de integração.

## Tecnologias Usadas

Back-End:

> NodeJS, Express, Joi, Sequelize, JWT

Banco de dados:

> MySQL

Testes:

> Mocha, Chai

## Variáveis de ambiente

- HOSTNAME=`nome do host mysql`
- MYSQL_USER=`nome do usuário mysql`
- MYSQL_PASSWORD=`senha do mysql`
- MYSQL_SCHEMA=blogs_api
- MYSQL_SCHEMA_TEST=blogs_api_test
- JWT_SECRET=`segredo do JWT`

## Executando a Aplicação

1. Instale as dependências

   ```bash
   npm install
   ```

2. Inicie o servidor http

   ```bash
   npm start
   ```

## Executando os testes

1. Instale as dependências

   ```bash
   npm install
   ```

2. Rode o comando que executa os testes

   ```bash
   npm test
   ```

3. \*Para testar um arquivo específico use a variável de ambiente NAME

   ```bash
   NAME=user npm test
   ```

## Endpoints

#### Realiza o cadastro

```http
  POST /user
```

|             | Parâmetro     | Tipo     | Descrição            |
| :---------- | :------------ | :------- | :------------------- |
| Body (JSON) | `displayName` | `string` | Nome de usuário      |
| Body (JSON) | `email`       | `string` | Email do usuário     |
| Body (JSON) | `password`    | `string` | Senha do usuário     |
| Body (JSON) | `image`       | `string` | Link para uma imagem |
