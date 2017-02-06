const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: Number,
    partyIds: [Number],
})

const User = mongoose.model('User', UserSchema)

module.exports = User