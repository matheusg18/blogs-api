const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const fakeData = require('./utils/fakeData');
const { startDB, dropDB, getToken } = require('./utils/testUtils');
const commonTests = require('./utils/commonTests');

chai.use(chaiHttp);
const { expect } = chai;

describe('/post Testes', () => {
  describe('POST /post', () => {
    commonTests.testToken('post', '/post');

    describe('ao enviar um body inválido', () => {
      before(startDB);
      after(dropDB);

      describe('não passar o title', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .post('/post')
            .set({ authorization: token })
            .send({ ...fakeData.postPostRequest, title: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"title" is required');
        });
      });

      describe('não passar o content', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .post('/post')
            .set({ authorization: token })
            .send({ ...fakeData.postPostRequest, content: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"content" is required');
        });
      });

      describe('não passar o categoryIds', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .post('/post')
            .set({ authorization: token })
            .send({ ...fakeData.postPostRequest, categoryIds: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"categoryIds" is required');
        });
      });
    });

    describe('ao mandar categoryIds que não existem no banco de dados', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 400', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .post('/post')
          .set({ authorization: token })
          .send({ ...fakeData.postPostRequest, categoryIds: [999] });

        expect(status).to.be.equal(400);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('"categoryIds" not found');
      });
    });

    describe('ao conseguir cadastrar um post com sucesso', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar um objeto com as informações do post criado com status 201', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .post('/post')
          .set({ authorization: token })
          .send(fakeData.postPostRequest);

        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal(fakeData.postPostResponse);
      });
    });
  });

  describe('GET /post', () => {
    commonTests.testToken('get', '/post');

    describe('quando da tudo certo', () => {
      before(startDB);
      after(dropDB);

      it('retorna um array posts com status 200', async () => {
        const token = await getToken();
        const { body, status } = await chai.request(app).get('/post').set({ authorization: token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.postGetResponse);
      });
    });
  });

  describe('GET /post/:id', () => {
    commonTests.testToken('get', '/post/1');

    describe('quando da tudo certo (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('retorna objeto com as informações do post com status 200', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .get('/post/1')
          .set({ authorization: token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.postGetIdResponse);
      });
    });

    describe('quando não existe um post com o id passado (id = 999)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 404', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .get('/post/999')
          .set({ authorization: token });

        expect(status).to.be.equal(404);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Post does not exist');
      });
    });
  });

  describe.only('PUT /post/:id', () => {
    commonTests.testToken('put', '/post/1');

    describe('ao enviar um body inválido (id = 1)', () => {
      before(startDB);
      after(dropDB);

      describe('não passar o title', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .put('/post/1')
            .set({ authorization: token })
            .send({ ...fakeData.postPutRequest, title: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"title" is required');
        });
      });

      describe('não passar o content', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .put('/post/1')
            .set({ authorization: token })
            .send({ ...fakeData.postPutRequest, content: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"content" is required');
        });
      });
    });

    describe('ao mandar categoryIds (não é permitido mudá-las) (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 400', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .put('/post/1')
          .set({ authorization: token })
          .send({ ...fakeData.postPutRequest, categoryIds: [1] });

        expect(status).to.be.equal(400);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Categories cannot be edited');
      });
    });

    describe('quando um usuário não autor do post tentar atualizá-lo (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 401', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .put('/post/1')
          .set({ authorization: token })
          .send(fakeData.postPutRequest);

        expect(status).to.be.equal(401);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Unauthorized user');
      });
    });

    describe('quando não existe um post com o id passado (id = 999)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 404', async () => {
        const token = await getToken({ email: 'lewishamilton@gmail.com', password: '123456' });
        const { body, status } = await chai
          .request(app)
          .put('/post/999')
          .set({ authorization: token })
          .send(fakeData.postPutRequest);

        expect(status).to.be.equal(404);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Post does not exist');
      });
    });

    describe('quando consegue atualizar com sucesso (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar um objeto com as informações do post atualizado com status 200', async () => {
        const token = await getToken({ email: 'lewishamilton@gmail.com', password: '123456' });
        const { body, status } = await chai
          .request(app)
          .put('/post/1')
          .set({ authorization: token })
          .send(fakeData.postPutRequest);

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.postPutResponse);
      });
    });
  });

  describe('DELETE /post/:id', () => {
    commonTests.testToken('delete', '/post/1');

    describe('quando um usuário não autor do post tentar deletá-lo (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 401', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .delete('/post/1')
          .set({ authorization: token });

        expect(status).to.be.equal(401);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Unauthorized user');
      });
    });

    describe('quando não existe um post com o id passado (id = 999)', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 404', async () => {
        const token = await getToken({ email: 'lewishamilton@gmail.com', password: '123456' });
        const { body, status } = await chai
          .request(app)
          .delete('/post/999')
          .set({ authorization: token });

        expect(status).to.be.equal(404);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('Post does not exist');
      });
    });

    describe('quando da tudo certo (id = 1)', () => {
      before(startDB);
      after(dropDB);

      it('retorna status 204', async () => {
        const token = await getToken({ email: 'lewishamilton@gmail.com', password: '123456' });
        const { body, status } = await chai
          .request(app)
          .delete('/post/1')
          .set({ authorization: token });

        expect(status).to.be.equal(204);
        expect(body).to.be.deep.equal({});
      });
    });
  });
});
