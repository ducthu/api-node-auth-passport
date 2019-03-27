const config = require('../config/db');
const db = require('../_helpers/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.User;

module.exports = {
    authenticate,
    create
};

async function authenticate({username, password}){
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.hash)){
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user._id }, config.secret, {expiresIn: 36000});
        return {
            ...userWithoutHash,
            token
        };
    }
};

async function create(userParam){
     // validate username
     if(await User.findOne({username: userParam.username})){
        throw 'Username "' + userParam.username + '" is already taken';
    }
    // validate email
    if(await User.findOne({email: userParam.email})){
        throw 'Email "' + userParam.email + '" is already registered';
    }
    const user = new User(userParam);
    // hash password
    if(userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }else{
        throw 'You need a passport, try again';
    }
    // save user
    await user.save();
};
