const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

class DataBase {
    constructor() {
        const Schema = mongoose.Schema
        const db = mongoose.connection
        const PartySchema = new Schema({
            userId: Number,
            title: String,
            time: Number,
            location: String,
            numberOfPlayer: Number,
        })
        PartySchema.path('numberOfPlayer').default(function() {
            return 13
        })
        const Party = mongoose.model('Party', PartySchema)

        this.Party = Party
    }

    add({userId, title, time, location, numberOfPlayer}) {
        return this.Party.create({
            userId,
            title,
            time,
            location,
            numberOfPlayer,
        })
    }

    queryById(id) {
        return this.Party.findOne({_id: id})
    }

    getAll() {
        return this.Party.find()
    }

    update(id, party) {
        return this.Party.find({_id: id}).update(party)
    }
}

const db = new DataBase()

module.exports = db
