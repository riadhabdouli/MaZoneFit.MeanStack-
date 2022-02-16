const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  username: { type: String, required: true},
  password:{ type: String, required: true},
  email: { type: String, required: true},
  fullname: { type: String, required: true},
  height: { type: String, required: true},
  weight: { type: String, required: true}
});

module.exports = mongoose.model('member',memberSchema);