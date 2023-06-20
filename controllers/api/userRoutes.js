const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try{
    const user = await User.findAll({
        include:[{model:Favorites},{model:JobPosting}] // including its associated favourite and jobposting for a user
    })
    res.status(200).json(user)
   }catch(err){
    res.status(500).json({message:err})
   }
})

router.get('/:id', async (req, res) => {
    try{
     const user = await User.findOne({
        where:{id:req.params.id},
        include: [
          {
            model: Favorites,
            include: [
              {
                model: JobPosting,
              },
            ],
          },
        ], // including its associated favourite and jobposting for a user
     })
     res.status(200).json(user)
    }catch(err){
     res.status(500).json({message:err})
    }
 })

router.post('/', async (req, res) => {
    const { username, email, password, userType } = req.body;
    try{
        const user = await User.create({
             name:username,
             email:email,
             password:password,
             isAuth:userType
        })
        res.status(200).json(user)
       }catch(err){
        res.status(500).json({message:err})
       }
    })

router.put('/:id',async(req,res)=>{
try{
    const user = User.update(req.body,{
        where:{
            id:req.params.id
        }
    })
    if(!user){
        res.status(404).json({message:'User not found'})
    }else{
        res.status(200).json(user)
    }
    
}catch(err){
    res.status(500).json(err)
}
})

router.delete('/:id',async(req,res)=>{
     // delete one user by its `id` value
 try{
    await User.destroy({
      where:{
        id:req.params.id
      }
    }).then((rows)=>{
      res.status(200).json({message:rows+ ' rows(s) affected'})
    })
   }catch(err){
    res.status(500).json({message:err})
   }
})

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      }); 
    } else {
      res.status(404).end();
    }
  });

module.exports = router