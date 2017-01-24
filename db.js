'use strict'

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

class DataBase {
    constructor() {
        const Schema = mongoose.Schema
        const db = mongoose.connection
        const PartySchema = new Schema({
            id: Number,
            title: String,
            time: {type: Date, default: Date.now()},
            location: String,
            numberOfPlayer: Number,
        })

        const Party = mongoose.model('Party', PartySchema)

        this.Party = Party
    }

    add(party) {
        // const {id, title, location, numberOfPlayer = 0} = party

        const item = new this.Party({
            id: party.id,
            title: party.title,
            location: party.location,
            numberOfPlayer: party.numberOfPlayer || 0,
        })

        return item
    }

    queryById(id, callback) {
        this.Party.find({id}, callback)
    }
}

const db = new DataBase()

module.exports = db
