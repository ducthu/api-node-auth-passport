const express = require('express');
const app = express();
const http = require('http');

const port = 3000;

// ROUTERS
app.use('/users', require('./controllers/user.controller'));
app.use('/auth', require('./controllers/auth.controller'));

// GESTION DES ERREURS 
const errorHandler = require('./_helpers/error-handlers');
app.use(errorHandler);

http.createServer(app).listen(port, () => {
    console.log('Listening on port: ' + port + ' -> http://localhost:'+port)
})