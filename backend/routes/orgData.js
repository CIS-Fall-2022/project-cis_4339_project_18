const express = require("express");
const router = express.Router();

//importing data model schemas
let { orgdata } = require("../models/models"); 

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

router.get("/orgName/", (req, res, next) => { 
    orgdata.findOne({org_id: process.env.ORG}, 
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