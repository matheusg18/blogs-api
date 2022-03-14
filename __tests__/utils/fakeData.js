module.exports = {
  userPostRequest: {
    displayName: 'Homer Simpson',
    email: 'homer.simpson@gmail.com',
    password: '123456',
    image: 'https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png',
  },

  loginPostRequest: {
    email: 'MichaelSchumacher@gmail.com',
    password: '123456',
  },

  invalidEmails: [
    'homersimpson',
    ' #@%^%#$@#$@#.com',
    '@homer.com',
    'homer simpson <email@example.com>',
  ],

  userGetResponse: [
    {
      id: 1,
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    },
    {
      id: 2,
      displayName: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
    },
  ],

  userGetIdResponse: {
    id: 1,
    displayName: 'Lewis Hamilton',
    email: 'lewishamilton@gmail.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
  },
};
