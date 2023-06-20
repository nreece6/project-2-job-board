<<<<<<< Updated upstream
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
=======
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
>>>>>>> Stashed changes

class User extends Model {}

User.init(
<<<<<<< Updated upstream
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
          },
          name:{
            type:DataTypes.STRING,
            allowNull:false
          },
          email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail: true
            }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: 8,
            },
          },
          isAuth:{
            
                type: DataTypes.BOOLEAN
              },
          
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
)
module.exports = User
=======
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        is: /^\+?\d{10,}$/, // regular expression for a valid phone number
      },
    },
    resume: {
      type: DataTypes.BLOB,
      allowNull: true,
      validate: {
        maxFileSize(value) {
          if (value && value.length > 2 * 1024 * 1024) {
            throw new Error("File size must be less than 2 megabytes");
          }
        },
      },
    },

    isAuth: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
>>>>>>> Stashed changes
