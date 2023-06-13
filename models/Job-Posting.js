const { Model, DataTypes } = require('sequelize');


const sequelize = require('../config/connection.js');


class JobPosting extends Model {}

JobPosting.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
          },
          job_name:{
            type:DataTypes.STRING,
            allowNull:false

          },
          job_description:{
            type:DataTypes.STRING,
            allowNull:false

          },
          job_location:{
            type:DataTypes.STRING,
            allowNull:false

          },
          Company_name:{
            type:DataTypes.STRING,
            allowNull:false

          },
          user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'user',
                key:"id"
              }

          },
          
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'jobPosting',
      }
)


module.exports = JobPosting