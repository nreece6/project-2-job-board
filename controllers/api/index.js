const router = require('express').Router();
const favoritesRoutes = require('./favoritesRoutes')
const userRoutes = require('./userRoutes');
const jobPostingRoutes = require('./jobPostingRoutes');
const applicantsRouters = require('./applicantsRoutes')

router.use('/users',userRoutes);
router.use('/jobpostings', jobPostingRoutes);
router.use('/favorites',favoritesRoutes);
router.use('/applicants',applicantsRouters)

module.exports = router;
