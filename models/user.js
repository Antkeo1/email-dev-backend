const mongoose = require('mongoose')
const Schema  = mongoose.Schema

module.exports = const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema)
