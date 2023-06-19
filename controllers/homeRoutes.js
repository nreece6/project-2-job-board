const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../models');
const sendResume = require('../drive/quickstart/index')
const withAuth = require('../utils/auth');
const Multer = require("multer")
const { Storage } = require("@google-cloud/storage");
let projectId = "stable-argon-389922"; // Get this from Google Cloud
let keyFilename = "mykey.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("jobposting-board")
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});


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

  router.get("/application", async (req, res) => {
    try {
      const [files] = await bucket.getFiles();
      res.send([files]);
      console.log("Success");
    } catch (error) {
      res.send("Error:" + error);
    }
  });

  router.post("/application", multer.single("imgfile"), (req, res) => {
    console.log("Made it /upload");
    try {
      if (req.file) {
        console.log("File found, trying to upload...");
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();
  
        blobStream.on("finish", () => {
          res.status(200).send("Success");
          console.log("Success");
        });
        blobStream.end(req.file.buffer);
      } else throw "error with img";
    } catch (error) {
      res.status(500).send(error);
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

module.exports = router;


