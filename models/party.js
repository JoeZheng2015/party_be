const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    userId: Number,
    title: String,
    time: Number,
    location: String,
    numberOfPlayer: Number,
})

mongoose.model('Party', PartySchema)