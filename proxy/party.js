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
    console.log(2)
    const a = ids.map(id => ({_id: id}))
    console.log(a)
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
