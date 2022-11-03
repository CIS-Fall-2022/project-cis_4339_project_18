const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    orgName: {
        type: String
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    orgName: {
        type: String
    }
}, {
    collection: 'eventData'
});

// health collection information 

//contact collection information

// Logs Collection
    let logSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        clientID: {
            type: Number,
            required: true
        },
        serviceID: {
            type: Number,
            required: true
        },
        accessDate: {
            type: Date,
            required: true
        },
      accessTime:{
         type: String,
         required: true
        }  
    },
        {
            collection: 'logs'
        });

// Organizations Collection
    let orgDataSchema = new Schema({
        _id: { 
            type: String, 
            default: uuid.v1 
        },
        orgName: {
            type: String
        },
        eventID: {
            type: Number,
            required: true
        },
        org_desc: {
            type: String
        },
        phoneNumbers: {
            type: Array,
            required: true
        },
        email: {
            type: String
        },
        org_address: {
            line1: {
                type: String
            },
            line2: {
                type: String
            },
            city: {
                type: String
            },
            county: {
                type: String
            },
            zip: {
                type: Number
            }
        }
    }, {
        collection: 'orgData'
    });

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const logs = mongoose.model('logs', logSchema);
const orgdata = mongoose.model('orgData', orgDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, logs, orgdata}
