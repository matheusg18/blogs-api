const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/index');

chai.use(chaiHttp);
const { expect } = chai;

const testToken = (route) => {
  describe('ao não enviar o token de autorização', () => {
    it('deve retornar uma mensagem de erro com status 401', async () => {
      const { body, status } = await chai.request(app).get(route);

      expect(status).to.be.equal(401);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Token not found');
    });
  });

  describe('ao enviar um token de autorização inválido', () => {
    it('deve retornar uma mensagem de erro com status 401', async () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const { body, status } = await chai
        .request(app)
        .get(route)
        .set({ authorization: invalidToken });

      expect(status).to.be.equal(401);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Expired or invalid token');
    });
  });
};

module.exports = { testToken };
