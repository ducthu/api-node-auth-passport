const config = require('../config/db');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {useCreateIndex: true, userNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model')
}