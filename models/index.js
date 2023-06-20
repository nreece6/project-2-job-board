const User = require('./User')
const JobPosting = require('./Job-Posting')
const Favorites = require('./Favorites')
const Applicants = require("./applicants")

User.hasMany(JobPosting, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Favorites, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

JobPosting.belongsTo(User, {
    foreignKey: 'user_id'
})

Favorites.belongsToMany(User, {
    through: JobPosting,
    foreignKey: 'user_ID'
})

module.exports = { User, JobPosting, Favorites, Applicants}