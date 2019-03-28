const express = require('express');
const router = express.Router();
const passport = require('passport');
const userService = require('../services/user.service');

router.get('/', passport.authenticate('jwt', { session: false }), getAll);

module.exports = router;

function getAll(req, res, next){
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}