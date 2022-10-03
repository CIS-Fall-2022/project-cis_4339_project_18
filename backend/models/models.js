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
    }]
}, {
    collection: 'eventData'
});

// health collection information 
let healthDataSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    serviceID: {
        type: Number,
        required: true
    },
    activityProfile: [{
        activityID: {
            type: Number,
            required: true
        },
        activityName: {
            type: String,
            required: true
        },
        activityDesc: {
            type: String
        }
    }]
},
    {
        collection: 'healthData'
    });
//contact collection information
    let contactDataSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        serviceID: {
            type: Number,
            required: true
        },
        activityProfile: [{
            activityID: {
                type: Number,
                required: true
            },
            activityName: {
                type: String,
                required: true
            },
            activityDesc: {
                type: String
            }
        }]
    },
        {
            collection: 'contactData'
        });
// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const healthdata = mongoose.model('healthData', healthDataSchema);
const contactdata = mongoose.model('contactData', contactDataSchema);
// package the models in an object to export 
module.exports = { primarydata, eventdata }
