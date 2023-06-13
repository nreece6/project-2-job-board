const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../../models');
// const withAuth = require('../utils/auth');

//login functionality to be attached in here to limit access to routes
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
         include:[{model:Favorites},{model:JobPosting}] // including its associated favourite and jobposting for a user
     })
     res.status(200).json(user)
    }catch(err){
     res.status(500).json({message:err})
    }
 })

router.post('/', async (req, res) => {
    const { name, email, password, isAuth } = req.body;
    try{
        const user = await User.create({
             name:name,
             email:email,
             password:password,
             isAuth:isAuth
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

module.exports = router