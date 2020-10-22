const { Schema, model, Types } = require('mongoose')

const shema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	sault: { type: String, required: true, unique: true },
	cryptString: { type: String, required: true, unique: true },
	crypts: [{ date: Date }],
	isAdmin: { type: Boolean, required: true },
})

module.exports = model('User', shema)
