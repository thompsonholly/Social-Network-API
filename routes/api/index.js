const router = require('express').Router();
const userroutes = require('./userroutes');
const thoughtroutes = require('./thoughtroutes');

router.use('/users', userroutes);
router.use('/thoughts', thoughtroutes);

module.exports = router;
