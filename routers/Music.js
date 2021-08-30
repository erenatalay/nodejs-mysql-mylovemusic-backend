const express = require("express");
const {getAllMusic,addMusic,updateMusic,deleteMusic} = require("../controllers/music")
const {getAccessToRoute} = require("../middleware/authorization/auth")

const router = express.Router();

router.get("/allMusic",getAccessToRoute,getAllMusic)
router.post("/addMusic",getAccessToRoute,addMusic)
router.put("/updateMusic/:id",getAccessToRoute,updateMusic)
router.delete("/deleteMusic/:id",getAccessToRoute,deleteMusic)


module.exports = router;