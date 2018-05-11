const mongoose = require('mongoose'),
	shortid = require('shortid');

let userSchema = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	fullName: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: String, required: true },
	grade: { type: Number, required: true },
	email: { type: String, required: true },
	cellPhoneNum: { type: String, required: true },
	userGroup: { type: [String], required: true },
	created: { type: Date, required: true, default: Date.now },
	active: { type: Boolean, required: true, default: true },
	verified: { type: Boolean, required: true, default: false },
	cellPhoneVerified: { type: Boolean, required: true, default: false },
	warnings: { type: Number, required: true, default: 0 },
	// if a tutor
	maxStudents: { type: Number, required: false },
	payment: { type: String, required: false },
	courses: { type: [Number], required: false }
}, { collection: _db.get('db.collection.users') });

let User = mongoose.model('User', userSchema);

module.exports = User;
