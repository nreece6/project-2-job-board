const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
     const jobs = await JobPosting.findAll({
         include:[{model:User}] // including its associated favourite and jobposting for a user
     })
     res.status(200).json(jobs)
    }catch(err){
     res.status(500).json({message:err})
    }
 })

 router.get('/:id', async (req, res) => {
    try{
     const job = await JobPosting.findOne({
         include:[{model:User}] // including its associated favourite and jobposting for a user
     })
     res.status(200).json(job)
    }catch(err){
     res.status(500).json({message:err})
    }
 })


 router.post('/', async (req, res) => {
    const { job_name, job_description, job_location, user_id } = req.body;
    try{
        const job = await JobPosting.create({
            job_name:job_name,
            job_description:job_description,
            job_location:job_location,
            user_id:user_id
        })
        res.status(200).json(job)
       }catch(err){
        res.status(500).json({message:err})
       }
    })

    router.put('/:id',async(req,res)=>{
        try{
            const job = JobPosting.update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            res.status(200).json(job)
        }catch(err){
            res.status(500).json(err)
        }
      })