const User = require('../models/user')
const {getUserId} = require('../utils/helper')

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
    return User.findOne({userId})
}

exports.remove = function() {
    return User.remove()
}

exports.removePartyId = function(userId, partyId) {
    return User.findOne({userId})
        .then(res => {
            const partyIds = res.partyIds.filter(id => id !== partyId)
            console.log('--', res.partyIds, partyIds)
            return User.update({userId}, {$set: {partyIds: partyIds}})
        })
}
