const {  } = require('../models');
// model name 

const jobPostingData = [
  {
    job_name: '',
    job_description: '',
    job_location: "",
    user_id: '',
  },
  {
    job_name: '',
    job_description: '',
    job_location: "",
    user_id: '',
 
  },
  {
    job_name: '',
    job_description: '',
    job_location: "",
    user_id: '',
  },
  {
    job_name: '',
    job_description: '',
    job_location: "",
    user_id: '',
  },
  {
    job_name: '',
    job_description: '',
    job_location: "",
    user_id: '',
  },
];

const seedJobLisings = () => JobListing.bulkCreate(jobPostingData);

module.exports = seedJobLisings;
