const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const fakeData = require('./utils/fakeData');
const { startDB, dropDB, getToken } = require('./utils/testUtils');
const commonTests = require('./utils/commonTests');

chai.use(chaiHttp);
const { expect } = chai;

describe('/user Testes', () => {
  describe('POST /user', () => {
    describe('ao cadastrar um usuário com sucesso', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar um token (JWT) com status 201', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/user')
          .send(fakeData.userPostRequest);

        expect(status).to.be.equal(201);
        expect(body).to.have.property('token');
        expect(() => {
          jwt.verify(body.token, process.env.JWT_SECRET);
        }).to.not.throw();
      });
    });

    describe('ao enviar um body inválido', () => {
      describe('displayName com menos de 8 caracteres', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, displayName: 'homer' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal(
            '"displayName" length must be at least 8 characters long'
          );
        });
      });

      describe('password que tenha menos de 6 caracteres', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, password: '12345' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" length must be 6 characters long');
        });
      });

      describe('password que tenha mais de 6 caracteres', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, password: '1234567' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" length must be 6 characters long');
        });
      });

      describe('email inválido (homer@.com)', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, email: 'homer@.com' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"email" must be a valid email');
        });
      });

      describe('email inválido (homer@a.c)', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, email: 'homer@a.c' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"email" must be a valid email');
        });
      });

      describe('não passar o email', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, email: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"email" is required');
        });
      });

      describe('não passar o password', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/user')
            .send({ ...fakeData.userPostRequest, password: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" is required');
        });
      });
    });

    describe('ao enviar um email já cadastrado', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 409', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/user')
          .send({ ...fakeData.userPostRequest, email: 'lewishamilton@gmail.com' });

        expect(status).to.be.equal(409);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('User already registered');
      });
    });
  });

  describe('GET /user', () => {
    commonTests.testToken('get', '/user');

    before(startDB);
    after(dropDB);

    describe('quando da tudo certo', () => {
      it('retorna um array de users', async () => {
        const token = await getToken();
        const { body, status } = await chai.request(app).get('/user').set({ authorization: token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.userGetResponse);
      });
    });
  });

  describe('GET /user/:id', () => {
    commonTests.testToken('get', '/user/1');

    before(startDB);
    after(dropDB);

    describe('quando da tudo certo (id = 1)', () => {
      it('retorna um objeto com as informações do user', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .get('/user/1')
          .set({ authorization: token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(fakeData.userGetIdResponse);
      });
    });
  });

  describe.only('DELETE /user/me', () => {
    commonTests.testToken('delete', '/user/me');

    before(startDB);
    after(dropDB);

    describe('quando da tudo certo', () => {
      it('retorna status 204', async () => {
        const token = await getToken();
        const { body, status } = await chai
          .request(app)
          .delete('/user/me')
          .set({ authorization: token });

        expect(status).to.be.equal(204);
        expect(body).to.be.deep.equal({});
      });
    });
  });
});
