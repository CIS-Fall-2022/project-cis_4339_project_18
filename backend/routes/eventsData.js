const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find({org_id: process.env.ORG},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find(
        { _id: req.params.id, org_id: process.env.ORG }, 
        
    (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" }, org_id: process.env.ORG}
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = { eventDate:  req.query["eventDate"], org_id: process.env.ORG}
    };
    eventdata.find(
        dbQuery, 
        (error, data) => { 
            if (error) {
                res.json(data);
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find(
        { attendees: req.params.id, org_id: process.env.ORG }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    eventdata.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id, org_id: process.env.ORG},
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed up
    eventdata.find(
        { _id: req.params.id, attendees: req.body.attendee, org_id: process.env.ORG }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//DELETE single entry by ID
router.delete("/deleteEvent/:id", (req, res, next) => {
    eventdata.deleteOne( 
        { _id: req.params.id, org_id: process.env.ORG}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET clients attending events in the past 2 months
//Cite for date agrergation: https://stackoverflow.com/questions/58232356/mongodb-subtract-months-from-date-with-value-from-database
router.get("/pastAttendees/", (req, res, next) => { 
    eventdata.find(
        {
            date: {
            $gte:new Date(new Date().setMonth(new Date().getMonth() - 2)),
            $lt:new Date()},
            org_id: process.env.ORG,
        },
        {
            eventName:1,
            date:1,
            attendees:{$size:"$attendees"}
        },
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

module.exports = router;