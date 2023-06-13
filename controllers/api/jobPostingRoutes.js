const router = require('express').Router();
const { Favorites, User, JobPosting } = require('../../models');
// const withAuth = require('../utils/auth');

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
     if(!job){
        res.status(404).json({message:'job not found'})
     }else{
         res.status(200).json(job)
     }
    
    }catch(err){
     res.status(500).json({message:err})
    }
 })


 router.post('/', async (req, res) => {
    const { job_name, job_description, job_location, user_id, company_name } = req.body;
    try{
        const job = await JobPosting.create({
            job_name:job_name,
            job_description:job_description,
            job_location:job_location,
            Company_name:company_name,
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

      router.delete('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const job = await JobPosting.findByPk(id);
          if (!job) {
            res.status(404).json({ message: 'job not found' });
          } else {
            await job.destroy();
            res.status(200).json({ message: 'job deleted' });
          }
        } catch (err) {
          res.status(500).json({ message: err });
        }
    })

module.exports = router