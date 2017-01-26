const models = require('../models')
const Party = models.Party


exports.add = function({userId, title, time, location, numberOfPlayer}) {
    return Party.create({
        userId,
        title,
        time,
        location,
        numberOfPlayer,  
    })
}

exports.getById = function(id) {
    return Party.findOne({_id: id})
}

exports.getAll = function() {
    return Party.find()
}

exports.update = function(id, party) {
    return exports.getById(id).update(party)
}