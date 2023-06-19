const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../models');
const withAuth = require('../utils/auth');
const db = require('../models')
const { Op } = require('sequelize')



router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jobsData = await JobPosting.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const jobs = jobsData.map((project) => project.get({ plain: true }));

    //Pass serialized data and session flag into template
    res.render('homepage', { 
      jobs,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/job/:id', async (req, res) => {
    try {
      const jobData = await JobPosting.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const job = jobData.get({ plain: true });
  
      res.render('job', {
        ...job,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/application/:id', async (req, res) => {
    try {
      const jobData = await JobPosting.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const job = jobData.get({ plain: true });
  
      res.render('application-form', {
        ...job,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
  router.get('/login', (req, res) => {
    res.render('login'); // Render the login view
  });
  

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: JobPosting }, { model: Favorites}],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/search', async (req, res) => {
  const searchTerm = req.query.term;

  try {
    const jobPostings = await JobPosting.findAll({
      where: {
        job_name: {
          [Op.like]: `%${searchTerm}%`
        }
      },
      attributes: ["id", "job_name"] // Return only the ID and job_name fields
    });
    const jobNames = jobPostings.map((jobPosting) => jobPosting.job_name);
    res.json(jobNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching job postings." });
  }
});



module.exports = router;


