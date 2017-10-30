const express = require('express');
const router = express.Router();

router.get('/hello', (req, res, next) => {
    console.log(req.query);
    req.parsedCookie = 'Hello world 21';
    next();
}, (req, res) => {
    res.send(req.parsedCookie);
});
// https://github.com/expressjs/cookie-parser/blob/master/index.js
export default router;
