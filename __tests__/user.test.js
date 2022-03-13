const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const fakeData = require('./utils/fakeData');
const { startDB, dropDB } = require('./utils/testUtils');

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
});
