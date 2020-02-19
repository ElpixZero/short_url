const {Schema, model, Types} = reqiire('mongoose');

const shema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('Link', shema)