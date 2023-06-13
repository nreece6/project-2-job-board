const router = require('express').Router();
const favoritesRoutes = require('./favoritesRoutes')
const userRoutes = require('./userRoutes');
const jobPostingRoutes = require('./jobPostingRoutes');


router.use('/users',userRoutes);
router.use('/jobpostings', jobPostingRoutes);
router.use('/favorites',favoritesRoutes);

module.exports = router;
