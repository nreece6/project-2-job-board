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
      res.render('application-form', { 
        jobs,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });