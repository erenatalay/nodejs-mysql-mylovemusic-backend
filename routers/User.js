const express = require("express");
const {register,getUser,login,logout} = require("../controllers/user")
const {getAccessToRoute} = require("../middleware/authorization/auth")

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/profile",getAccessToRoute,getUser)
router.get("/logout",getAccessToRoute,logout)

module.exports = router;