const router = require('express').Router();
const userRoutes = require('./userroutes');
const thoughtRoutes = require('./thoughtroutes');

router.use('/user', userRoutes);
// router.use('/thoughts', thoughtRoutes);

module.exports = router;
