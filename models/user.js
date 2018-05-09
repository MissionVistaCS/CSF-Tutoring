const mongoose = require('mongoose'),
	shortid = require('shortid');

let userSchema = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	name: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: String, required: true },
	grade: { type: Number, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	group: { type: [String], required: true },
	created: { type: Date, required: true, default: Date.now },
	active: { type: Boolean, required: true },
	warnings: { type: Number, required: true },
	// if a tutor
	maxStudents: { type: Number, required: false },
	payment: { type: String, required: false },
	courses: { type: [Number], required: false }
}, { collection: _db.get('db.collection.users') });

let User = mongoose.model('User', userSchema);

module.exports = User;
