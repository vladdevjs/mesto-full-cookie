const router = require('express').Router();

const auth = require('../middlewares/auth');

const authRoutes = require('./auths');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

module.exports = router;
