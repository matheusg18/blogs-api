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

      it.only('retorna um array posts com status 200', async () => {
        const token = await getToken();
        const { body, status } = await chai.request(app).get('/post').set({ authorization: token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.postGetResponse);
      });
    });
  });
});
