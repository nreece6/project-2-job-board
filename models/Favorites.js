const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Favorites extends Model {}

Favorites.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'favorites'
    },
)

module.exports = Favorites