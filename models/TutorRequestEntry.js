const mongoose = require('mongoose'),
    shortid = require('shortid');

let requestSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    tutor: {type: String, ref: 'User', default: null},
    fullName: {type: String, required: true},
    gender: {type: String, required: true},
    grade: {type: Number, required: true},
    email: {type: String, required: true},
    cellPhoneNum: {type: String, required: true},
    parentFullName: {type: String, required: true},
    parentEmail: {type: String, required: true},
    parentCellPhoneNum: {type: String, required: true},
    payment: {type: String, required: true},
    duplicate: {type: Boolean, required: true, default: false},
    courses: {type: [Number], required: true},
    created: {type: Date, required: true, default: Date.now},
    state: {type: String, required: true, default: 'MANUAL'}, /*MANUAL, PENDING, UNACCEPTED, ACTIVE, INACTIVE*/
    notifications: {type: [Date]},
    pairingAcceptance: {type: Date, required: false, default: null}
}, {collection: _db.get('db.collection.requests')});

let Request = mongoose.model('Request', requestSchema);

module.exports = Request;
