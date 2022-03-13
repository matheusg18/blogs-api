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
};
