const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    userId: String,
    title: String,
    time: Number,
    location: String,
    players: Array,
})
const Party = mongoose.model('Party', PartySchema)

module.exports = Party