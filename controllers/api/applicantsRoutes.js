const router = require('express').Router();
const { Favorites, User, JobPosting, Applicants } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const { Name, email, years_ex,description, resume } = req.body;
      const applicants = await Applicants.create({
        name: Name,
        email: email,
        years_ex: years_ex,
        description: description,
        resume: resume

        // user_id: user_id,
        // job_id: job_id,
      });
      res.status(200).json({ applicants_id: applicants.id});
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  module.exports = router