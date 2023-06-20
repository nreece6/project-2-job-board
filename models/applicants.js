const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Applicants extends Model {}

Applicants.init(
    {
       name:{
        type: DataTypes.STRING

       },
       email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true
        }},
        years_ex:{
            type:DataTypes.INTEGER
        },
        description:{
            type:DataTypes.INTEGER

        },

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        job_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'jobPosting',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'applicants'
    },
)

module.exports = Applicants