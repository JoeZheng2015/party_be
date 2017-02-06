const Party = require('../models/party')

exports.add = function({userId, title, time, location, players}) {
    return Party.create({
        userId,
        title,
        time,
        location,
        players,  
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

exports.addPlayer = function(id, player) {
    return Party.update(
        {_id: id},
        {$push: {players: player}}
    )
}

exports.remove = function() {
    return Party.remove()
}
