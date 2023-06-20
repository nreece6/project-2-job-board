const User = require('./User');
const JobPosting = require('./Job-Posting');
const Favorites = require('./Favorites');
const Applicants = require('./applicants');

User.hasMany(JobPosting, {  
    foreignKey: 'user_id',
  });

JobPosting.belongsTo(User, {  
  foreignKey: 'user_id',
});

User.hasMany(Favorites, {
  foreignKey: 'user_ID',
  onDelete: 'CASCADE',
});


Favorites.belongsTo(User, {
  foreignKey: 'user_ID',
});

JobPosting.hasMany(Favorites,{
    foreignKey:'job_id'
})
Favorites.belongsTo(JobPosting, {
  foreignKey: 'job_id',
});

module.exports = { User, JobPosting, Favorites, Applicants };
