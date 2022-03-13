const shell = require('shelljs');

module.exports = {
  startDB: () => {
    shell.exec('npx sequelize --env test db:create');
    shell.exec('npx sequelize --env test db:migrate');
    shell.exec('npx sequelize --env test db:seed:all');
  },

  dropDB: () => {
    shell.exec('npx sequelize --env test db:drop');
  },
};
