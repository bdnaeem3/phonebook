const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Title is required',
		minlength: 4,
		maxlength: 150,
	},
	phone: {
		type: String,
		required: 'Body is required',
		minlength: 11,
		maxlength: 13,
	},
});

module.exports = Contact = mongoose.model('contacts', ContactSchema);
