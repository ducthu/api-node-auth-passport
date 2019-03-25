const express = require('express');
const router = express.Router();

router.post('/', getAll);

module.exports = router;

function getAll(req, res, next){
    return {};
}