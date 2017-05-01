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

const getById = exports.getById = (id) => {
    return Party.findOne({_id: id})
}

exports.getByIds = function(ids) {
    const a = ids.map(id => ({_id: id}))
    return Party.find({$or: a})
}

exports.update = function(id, party) {
    return getById(id).update(party)
}

exports.addPlayer = function(id, player) {
    return Party.update(
        {_id: id},
        {$push: {players: player}}).exec()
}

exports.remove = function() {
    return Party.remove()
}

exports.decreasePlayer = function(id, players) {
    console.log('-decreasePlayer', id, players)
    return Party.update(
        {_id: id},
        {$set: {players}}).exec()
}
