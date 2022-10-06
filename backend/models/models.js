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

// Client Collection
    let clientSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        clientID: {
            type: Number,
            required: true
        },
        intakeFormID: {
            type: Number,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        birthday: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    },
        {
            collection: 'clients'
    });

// Intake Form Collection
    let intakeSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        formID: {
            type: Number,
            required: true
        },
        clientID: {
            type: Number,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String
        },
        isPrevious: {
            type: Boolean
        }
    },
        {
            collection: 'intakes'
    });

// Services Collection
    let serviceSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        serviceID: {
            type: Number,
            required: true
        },
        clientID: {
            type: Number,
            required: true
        },
        serviceName: {
            type: String,
            required: true
        },
        serviceDesc: {
            type: String
        },
        organization: {
            type: String,
            required: true
        }
    },
        {
            collection: 'services'
    });

// Events Collection
    let eventSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v1
        },
        eventID: {
            type: Number,
            required: true
        },
        serviceID: {
            type: Number,
            required: true
        },
        eventName: {
            type: String,
            required: true
        },
        endDate: {
            type: String
        },
        eventDesc: {
            type: String
        }
    },
        {
            collection: 'events'
        });

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
        orgID: {
            type: Number,
            required: true
        },
        eventID: {
            type: Number,
            required: true
        },
        org_desc: {
            type: String
        },
        org_contact: {
            phoneNumber: [{
                type: String
            }],
            email: [{
                type: String
            }] 
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
const healthdata = mongoose.model('healthData', healthDataSchema);
const contactdata = mongoose.model('contactData', contactDataSchema);
const clients = mongoose.model('client', clientSchema);
const intakes = mongoose.model('intake', intakeSchema);
const services = mongoose.model('service', serviceSchema);
const events = mongoose.model('events', eventSchema);
const logs = mongoose.model('logs', logSchema);
const orgs = mongoose.model('orgData', orgDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, healthdata, contactdata, clients, intakes, services, events, logs, orgs}