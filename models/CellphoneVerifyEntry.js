const mongoose = require('mongoose'),
    shortid = require('shortid');

let cellPhoneSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    user: {type: String, ref: 'User'}
}, {collection: _db.get('db.collection.cellphone-verify-entry')});

let CellphoneVerifyEntry = mongoose.model('CellphoneVerifyEntry', cellPhoneSchema);

module.exports = CellphoneVerifyEntry;
