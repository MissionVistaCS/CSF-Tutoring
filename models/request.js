const mongoose = require('mongoose'),
	shortid = require('shortid');

let requestSchema = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	tutor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
	studentPhone: { type: String, required: true },
	grade: { type: Number, required: true },
	gender: { type: String, required: true },
	parentName: { type: String, required: true },
	parentEmail: { type: String, required: true },
	parentPhone: { type: String, required: true },
	payment: { type: String, required: true }, 
	duplicate: { type: Boolean, required: true },
	courses: { type: [Number], required: true },
	created: { type: String, required: true, default: Date.now },
	state: { type: String, required: true }, 
	notifications: { type: [Date], required: true },
	pairingAcceptance: { type: Date, required: true }
}, { collection: _db.get('db.collection.requests') });

let Request = mongoose.model('Request', requestSchema);

module.exports = Request;
