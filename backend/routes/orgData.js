const express = require("express");
const router = express.Router();

//importing data model schemas
let { orgdata } = require("../models/models"); 

//Used for testing purposes 
router.get("/", (req, res, next) => { 
    orgdata.find(
        (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//Gets org name with id in .env file
router.get("/orgName", (req, res, next) => { 
    orgdata.findOne({_id : process.env.ORG}, 
        {orgName:1},
        (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)

        }
    })
});

module.exports = router;