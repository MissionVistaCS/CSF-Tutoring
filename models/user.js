const mongoose = require('mongoose');

// TODO: conditional fields if tutor
let userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: String, required: true },
	grade: { type: Number, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	group: [{ type: String, required: true }],
	created: { type: String, required: true, default: Date.now },
	active: { type: Boolean, required: true },
	warnings: { type: Number, required: true }
});

let User = mongoose.model('User', userSchema);

module.exports = User;