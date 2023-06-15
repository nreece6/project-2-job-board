const router = require('express').Router();
const favoritesRoutes = require('./favoritesRoutes')
const userRoutes = require('./userRoutes');
const jobPostingRoutes = require('./jobPostingRoutes');
const applicationForm = require("./aplicationForm")

router.use('/users',userRoutes);
router.use('/jobpostings', jobPostingRoutes);
router.use('/favorites',favoritesRoutes);
router.use('/application', applicationForm)

module.exports = router;
