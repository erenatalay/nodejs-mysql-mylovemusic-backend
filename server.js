const express = require("express");
const dotenv = require("dotenv");
const {main} = require("./database/connection");
const routers = require("./routers");
const customErrorHandler = require("./middleware/errors/customErrorHandler");

dotenv.config({
    path : "./config/env/config.env"
})



const app = express();


//DB connection
main();

//express -body middleware
app.use(express.json());
const PORT =  process.env.PORT;



//routers
app.use("/api",routers);

//Error Handling
app.use(customErrorHandler)





app.listen(PORT,() => {
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`)
})