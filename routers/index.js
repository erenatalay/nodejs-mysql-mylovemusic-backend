const express = require("express");
const User = require("./User");
const Music = require("./Music");

const router = express.Router();

router.use("/user",User);
router.use("/music",Music);

module.exports = router