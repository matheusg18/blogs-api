const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const fakeData = require('./utils/fakeData');
const { startDB, dropDB, getToken } = require('./utils/testUtils');
const commonTests = require('./utils/commonTests');

chai.use(chaiHttp);
const { expect } = chai;

describe('/categories Testes', () => {
  describe('POST /categories', () => {
    commonTests.testToken('post', '/categories');

    describe('ao enviar um body inválido', () => {
      before(startDB);
      after(dropDB);

      describe('não passar o name', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const token = await getToken();
          const { body, status } = await chai
            .request(app)
            .post('/categories')
            .set({ authorization: token })
            .send({});

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"name" is required');
        });
      });
    });

    describe('ao cadastrar uma categoria com sucesso', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar um objeto com as informações da categoria criada com status 201', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .post('/categories')
          .set({ authorization: token })
          .send(fakeData.categoriesPostRequest);

        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal(fakeData.categoriesPostResponse);
      });
    });
  });
});
