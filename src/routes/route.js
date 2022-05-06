
const express = require('express');
const router = express.Router();
const controllers = require("../controllers/controllers");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// create colleges
router.post("/functionup/colleges", controllers.createCollege)

// create interns
router.post("/functionup/Interns", controllers.createIntern)

//get all collegedetails
router.get("/functionup/collegeDetails", controllers.getCollege)



// if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;