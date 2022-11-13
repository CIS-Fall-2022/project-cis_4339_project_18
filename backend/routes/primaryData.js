const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find({org_id: process.env.ORG}, 
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
    primarydata.find( 
        { _id: req.params.id, org_id: process.env.ORG }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" }, org_id: process.env.ORG }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }, org_id: process.env.ORG
        }
    };
    primarydata.find(
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => {
    let id = "";
    eventdata.find({
        org_id: process.env.ORG,
        attendees:id = `${req.params.id}`
    },
    {eventName:1},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
    console.log(id);
});

//POST
router.post("/", (req, res, next) => { 
    primarydata.create(
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
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

//DELETE single entry by ID
router.delete("/deleteClient/:id", (req, res, next) => {
    let id = "";
    primarydata.deleteOne( 
        { _id: req.params.id, org_id: process.env.ORG}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                // Cite for removeing element in array
                //https://www.tutorialspoint.com/how-to-remove-element-in-a-mongodb-array#:~:text=To%20remove%20an%20element%2C%20update,that%20match%20a%20specified%20condition.
                eventdata.updateMany({
                    $pull:{attendees: req.params.id}
                },   
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
    );
});
module.exports = router;