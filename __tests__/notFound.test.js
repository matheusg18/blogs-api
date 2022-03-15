const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

chai.use(chaiHttp);
const { expect } = chai;

const wrongPaths = ['/asd/12', '/user/qeq/121', '/post/1/1/1/1/1/1/1'];
const verbs = ['get', 'post', 'put', 'delete'];

describe('Testes em rotas inexistentes', () => {
  verbs.forEach((verb) => {
    wrongPaths.forEach((route) => {
      describe(`ao acessar ${verb.toUpperCase()} ${route}`, () => {
        it('deve recebar uma mensagem de 404 notFound', async () => {
          const { body, status } = await chai.request(app)[verb](route);

          expect(status).to.be.equal(404);
          expect(body).to.have.property('message');
          expect(body.message).to.be.equal('404 NotFound :(');
        });
      });
    });
  });
});
