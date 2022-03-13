const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const fakeData = require('./utils/fakeData');
const { startDB, dropDB } = require('./utils/testUtils');

chai.use(chaiHttp);
const { expect } = chai;

describe('/login Testes', () => {
  describe('POST /login', () => {
    describe('ao fazer login com sucesso', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar um token (JWT) com status 200', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/login')
          .send(fakeData.loginPostRequest);

        expect(status).to.be.equal(200);
        expect(body).to.have.property('token');
        expect(() => {
          jwt.verify(body.token, process.env.JWT_SECRET);
        }).to.not.throw();
      });
    });

    describe('ao enviar um body inválido', () => {
      describe('password que tenha menos de 6 caracteres', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/login')
            .send({ ...fakeData.loginPostRequest, password: '12345' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" length must be 6 characters long');
        });
      });

      describe('password que tenha mais de 6 caracteres', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/login')
            .send({ ...fakeData.loginPostRequest, password: '1234567' });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" length must be 6 characters long');
        });
      });

      fakeData.invalidEmails.forEach((invalidEmail) => {
        describe(`email inválido (${invalidEmail})`, () => {
          it('deve retornar uma mensagem de erro com status 400', async () => {
            const { body, status } = await chai
              .request(app)
              .post('/login')
              .send({ ...fakeData.loginPostRequest, email: invalidEmail });

            expect(status).to.be.equal(400);
            expect(body).to.have.property('message');
            expect(body.message).to.be.equal('"email" must be a valid email');
          });
        });
      });

      describe('não passar o email', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/login')
            .send({ ...fakeData.loginPostRequest, email: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"email" is required');
        });
      });

      describe('não passar o password', () => {
        it('deve retornar uma mensagem de erro com status 400', async () => {
          const { body, status } = await chai
            .request(app)
            .post('/login')
            .send({ ...fakeData.loginPostRequest, password: undefined });

          expect(status).to.be.equal(400);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('"password" is required');
        });
      });
    });

    describe('ao enviar um email não cadastrado', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 404', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/login')
          .send({ ...fakeData.loginPostRequest, email: 'homer@simpson.com' });

        expect(status).to.be.equal(404);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('email not found');
      });
    });

    describe('ao enviar uma senha incorreta', () => {
      before(startDB);
      after(dropDB);

      it('deve retornar uma mensagem de erro com status 400', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/login')
          .send({ ...fakeData.loginPostRequest, password: 'abcdef' });

        expect(status).to.be.equal(400);
        expect(body).to.have.property('message');
        expect(body.message).to.be.equal('incorrect password');
      });
    });
  });
});
