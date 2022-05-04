
const express = require('express');
const router = express.Router();
const controllers = require("../controllers/controllers");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/functionup/colleges", controllers.createCollege)

router.post("/functionup/Interns", controllers.createIntern)

router.get("/functionup/collegeDetails", controllers.getCollege)
module.exports = router;