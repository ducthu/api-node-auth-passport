const {Strategy, ExtractJwt} = require('passport-jwt');
const secret = require('./db').secret;
const mongoose = require('mongoose');
const User = require('../_helpers/database').User;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

// handling tokens
// defines the key to be used when verifying the token.

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, {
                            id: user.id,
                            pseudo: user.pseudo,
                            email: user.email
                        })
                    }
                    return done(null, false);
                }).catch(err => console.error(err));
        })
    )
}