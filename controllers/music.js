const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")
const { DBO } = require("../database/connection");
const {Music} = require("../models");


const getAllMusic = asyncErrorWrapper(async ( req,res,next) => {

    const music = await DBO.table("music").get();

    return res.status(200).json({
        success : true,
        data : music
    })

})

const addMusic = asyncErrorWrapper(async ( req,res,next) => {

    const {artist,name,image} = req.body;
    const music = await Music.create({
        artist,
        name,
        image,
        user_id : req.user.id
    })

    return res.status(200).json({
        success : true,
        data : music
    })

})

const updateMusic = asyncErrorWrapper(async(req,res,next) => {
    const id = req.params.id
    const {name,artist,image} = req.body;
    const music = await Music.update({name,artist,image},{ where: { id}});
 

    return res.status(200).json({
        success : true,
    })
})

const deleteMusic = asyncErrorWrapper(async(req,res,next) => {
    const id = req.params.id
   
     await Music.destroy({where : {id}});
 

    return res.status(200).json({
        success : true,
    })
})


module.exports = {getAllMusic,addMusic,updateMusic,deleteMusic}