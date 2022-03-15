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

### Realizar cadastro

```curl
  POST /user
```

Exemplo de body:

```json
{
  "displayName": "Lewis Hamilton",
  "email": "lewishaamilton@gmail.com",
  "password": "123456",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```

### Fazer login

```curl
  POST /login
```

Exemplo de body:

```json
{
  "email": "lewishaamilton@gmail.com",
  "password": "123456"
}
```

---

**Os endpoints abaixo precisam que o token gerado ao fazer login ou ao se registrar seja passado no header `Authorization`.**

### Listar os usuários cadastrados

```curl
  GET /user
```

### Listar um usuário pelo seu id

```curl
  GET /user/{id}
```

### Deletar o seu próprio usuário

```curl
  DELETE /user/me
```

### Registrar uma nova categoria

```curl
  POST /categories
```

Exemplo de body:

```json
{
  "name": "Comunicação"
}
```

### Listar as categorias cadastrados

```curl
  GET /categories
```

### Criar um post

```curl
  POST /post
```

Exemplo de body:

```json
{
  "title": "Hollow Kngiht",
  "content": "Best metroidvania game ever made.",
  "categoryIds": [1, 2]
}
```

### Listar todos os posts

```curl
  GET /post
```

### Listar um post pelo seu id

```curl
  GET /post/{id}
```

### Pesquisar por posts em que o `title` ou `content` for igual ao `searchTerm`

```curl
  GET post/search?q=searchTerm
```

### Atualizar um post específico

```curl
  PUT /post/{id}
```

Exemplo de body:

```json
{
  "title": "Hollow Kngiht",
  "content": "Best metroidvania game ever made."
}
```

**Observação: não é possível mudar as categoryIds e apenas o autor do post pode alterá-lo.**

### Deletar um post específico

```curl
  DELETE /post/{id}
```
