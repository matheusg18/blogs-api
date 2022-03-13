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
  });
});

// display name ter menos de 8 caracteteres
// email inválido
// email faltando
// senha que não tem exatamente 6 caracteres
// senha faltando
// email já cadastrado
