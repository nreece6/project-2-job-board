const {JobPosting} = require('../models');
// model name 

const jobPostingData = [
  {
    job_name: 'Delivery Driver',
    Company_name:'Jimmy Johns',
    job_description: 'The Delivery Driver position requires bending, standing and walking the entire workday. Must have reliable transportation and the ability to use your own vehicle during work hours as well as valid insurance and license.',
    job_location: "Maple Grove, MN 55311",
    user_id: '1',
  },
  {
    job_name: 'Shift Manager',
    job_description: ' You will help support the Genral Manger and Assistant Manger, ensuring that every shift operates smoothly',
    job_location: "Saint Paul, MN 55119",
    user_id: '2',
 
  },
  {
    job_name: 'Warehouse Operations',
    job_description: 'Pack, load, and ship items to stores and guests. Ensure accurate processing of merchandise to our stores and guests',
    job_location: "Minneapolis, MN 55413",
    user_id: '3',
  },
  // {
  //   job_name: '',
  //   job_description: '',
  //   job_location: "",
  //   user_id: '',
  // },
  // {
  //   job_name: '',
  //   job_description: '',
  //   job_location: "",
  //   user_id: '',
  // },
];

const seedJobLisings = () => JobPosting.bulkCreate(jobPostingData);

module.exports = seedJobLisings;
