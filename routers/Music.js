const express = require("express");


const router = express.Router();

router.get("/",(req,res) => {
    return res.send("Music home Page")
})

module.exports = router;