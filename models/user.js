
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    generateJwtFromUser = function(){
      const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
  
      const payload = {
          id : this.id,
          email : this.email,
          first_name : this.first_name,
          last_name : this.last_name,
      };
  
      const token = jwt.sign(payload,JWT_SECRET_KEY,{
          expiresIn : JWT_EXPIRE
      })
  
      return token;
    };


  
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a firstname" },
        notEmpty: { msg: "Firstname must not be empty" },
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a lastname" },
        notEmpty: { msg: "Lastname must not be empty" },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a email" },
        notEmpty: { msg: "Email must not be empty" },
        isEmail: { msg: "Must be a valid email adress" },
      },

      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a password" },
        notEmpty: { msg: "Password must not be empty" },

      }

    },
    activationToken: {
      type: DataTypes.STRING,
    },
    activationExpire: {
      type: DataTypes.DATE,
    }


  },




    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function (password) {
          return bcrypt.compareSync(password, this.password);
        },
       
      },



    });




  return User;
};