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
        height: {
        type: Number,
        required: true
        },
        weight: {
        type: Number,
        required: true
        },
        raceEthnicity: {
            type: String,
            required: true
        },
        haveInsurance: {
            type: Boolean,
            required: true
        },
        getingVaccine: {
            type: Boolean,
            required: true
        },
        isVaccinated: {
            type: Boolean,
            required: true
        },
        vaccinePreference: {
            type: String,
            required: true
        },
        isPregnant: {
            type: Boolean,
            required: true
        },
        teenParent: {
            type: Boolean,
            required: true
        },
        lastUpdate: {
            type: Date,
            required: true
        },
}, {
    collection: 'healthData'
});
//contact collection information
let contactDataSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    cellphoneNumber: {
        type: Number,
        required: true
    },
    homephoneNumber: {
        type: Number,
        required: true
    },
    workphoneNumber: {
        type: Number,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    alternativeEmail: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    stateID: {
        type: String,
        required: true
    },
    countryID: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String,
        required: true
    },
    relationID: {
        type: String,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    },
}, {
collection: 'contactData'
});
// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const healthdata = mongoose.model('healthData', healthDataSchema);
const contactdata = mongoose.model('contactData', contactDataSchema);
// package the models in an object to export 
module.exports = { primarydata, eventdata, healthdata, contactdata }
