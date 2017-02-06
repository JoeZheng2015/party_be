const User = require('../models/user')

exports.addUser = function(userId) {
    return User.create({
        userId,
        partyIds: [],
    })
}

exports.addPartyId = function(userId, partyId) {
    return User.update({userId}, {$push: {partyIds: partyId}})
}

exports.getByUserId = function(userId) {
    return User.find({userId})
}

exports.remove = function() {
    return User.remove()
}
