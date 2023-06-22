const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const landingRoutes = require('./landingRoutes')

// Landing page route
router.use('/',landingRoutes);

router.use('/home',homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
