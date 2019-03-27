const express = require('express');
const app = express();
const http = require('http');

const passport = require('passport');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// PASSPORT
app.use(passport.initialize());
require('./config/passport')(passport);

// CUSTOM MIDDLEWARE
//custom Middleware for logging every requests going to the API
app.use((req,res,next) => {
    console.log('okokok');
    if (req.body) console.log(req.body);
    if (req.params) console.log(req.params);
    if(req.query) console.log(req.query);
    console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
  next();
});

// ROUTERS
app.use('/users', require('./controllers/user.controller'));
app.use('/auth', require('./controllers/auth.controller'));

// GESTION DES ERREURS 
const errorHandler = require('./_helpers/error-handlers');
app.use(errorHandler);

http.createServer(app).listen(port, () => {
    console.log('Listening on port: ' + port + ' -> http://localhost:'+port)
})