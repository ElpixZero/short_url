const { Schema, model, Types } = require('mongoose')

const shema = new Schema({
	date: { type: Date, required: true },
	author: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = model('Crypt', shema)
