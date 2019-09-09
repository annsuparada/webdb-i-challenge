const express = require('express');
const db = require('./data/dbConfig.js');
const server = express();
const accountsRouter = require('./accounts/accountsRouter.js');

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex </h3>');
  });
module.exports = server;