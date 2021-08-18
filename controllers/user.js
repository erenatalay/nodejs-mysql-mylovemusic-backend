const {User} = require("../models");
const asyncErrorWrapper = require("express-async-handler")
const {sendJwtClient} = require("../helpers/authorization/tokenHelpers")
const {validateUserInput,comparePassword} = require("../helpers/input/inputHelpers")
const CustomError = require("../helpers/error/CustomError")

const getUser = asyncErrorWrapper(async ( req,res,next) => {

  return res.json({
      success : true,
      data : {
          id : req.user.id,
          email : req.user.email,
          first_name : req.user.first_name,
          last_name : req.user.last_name,
      }

  })
})


const register = asyncErrorWrapper(async(req,res,next) => {
    const { first_name, last_name, email, password } = req.body;


    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
    });

    sendJwtClient(user ,res)

    
})


const login = asyncErrorWrapper(async(req,res,next) => {
   
    const {email,password} = req.body

    if (!(validateUserInput(email,password))) {
        return next(new CustomError("please check your input",400))
    }

    const user = await User.findOne({where : {email}})

    if (!comparePassword(password,user.password)) {
        return next(new CustomError("Please check your password",400))
    }
    sendJwtClient(user ,res)

    
})


const logout = asyncErrorWrapper(async(req,res,next) => {
    const { NODE_ENV } = process.env;

    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "logout successfuly"
    })
    

    
})

module.exports = {
    getUser,
    register,
    login,
    logout
}