let mongoose = require('mongoose');

// TODO: Tutor the entry is paired to field???

let requestSchema = new mongoose.Schema({
	studentName: { type: String, required: true },
        studentEmail: { type: String, required: true },
	studentPhone: { type: String, required: true },
	grade: { type: Number, required: true },
	gender: { type: String, required: true },
	parentName: { type: String, required: true },
	parentEmail: { type: String, required: true },
	parentPhone: { type: String, required: true },
	payment: [{ type: String, required: true }], // how to set length to max of two?
	duplicate: { type: Boolean, required: true },
	courses: [{ type: Number, required: true }],
	created: { type: String, required: true, default: Date.now },
	state: { type: String, required: true }, // don't know how to do this one
	notifications: [{ type: Date, required: true }],
	pairingAcceptance: { type: Date, required: false }
});

let Request = mongoose.model('Request', requestSchema);

module.exports = Request;