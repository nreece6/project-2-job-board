const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../../models');
const withAuth = require('../utils/auth');

  // Create a favourite
router.post('/', async (req, res) => {
    try {
      const { user_id, job_id } = req.body;
      const favourite = await Favorites.create({
        user_id: user_id,
        job_id: job_id,
      });
      res.status(200).json({ favorite_id: favourite.id });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
    // Read all favourites
  router.get('/', async (req, res) => {
    try {
      const favourites = await Favorites.findAll();
      if(!favourites){
        res.status(404).json({message:'favourites not'})
      }
      res.status(200).json(favourites);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
    // Read a single favourite
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const favourite = await Favorites.findByPk(id);
      if (!favourite) {
        res.status(404).json({ message: 'Favourite not found' });
      } else {
        res.status(200).json(favourite);
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
  // we probably dont need update functionality for favourites
  
  // // Update a favourite
  // router.put('/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { userId, jobId } = req.body;
  //     const favourite = await Favorites.findByPk(id);
  //     if (!favourite) {
  //       res.status(404).json({ message: 'Favourite not found' });
  //     } else {
  //       await favourite.update({
  //         user_id: userId,
  //         job_id: jobId,
  //       });
  //       res.status(200).json(favourite);
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err });
  //   }
  // });
  
  // Delete a favourite
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const favourite = await Favorites.findByPk(id);
      if (!favourite) {
        res.status(404).json({ message: 'Favourite not found' });
      } else {
        await favourite.destroy();
        res.status(200).json({ message: 'Favourite deleted' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
  module.exports = router