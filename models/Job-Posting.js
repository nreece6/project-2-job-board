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
            allowNull:true

          },
          job_description:{
            type:DataTypes.TEXT,
            allowNull:true

          },
          job_location:{
            type:DataTypes.STRING,
            allowNull:true

          },
          Company_name:{
            type:DataTypes.STRING,
            allowNull:true

          },
          salary:{
            type:DataTypes.DECIMAL,
            allowNull:true

          },
          schedule:{
            type:DataTypes.STRING,

          },
          remote_status:{
            type:DataTypes.STRING,
            
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