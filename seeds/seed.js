const sequelize = require('../config/connection');
const {JobPosting, User } = require('../models');
const userData = require('./userData.json')
const JobData = require('./JobPostingData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });
      for (const job of JobData) {
        await JobPosting.create({
          ...job,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      }
    
      process.exit(0);
}  
seedDatabase()