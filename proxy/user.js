const User = require('../models/user')
const {getUserId} = require('../utils/helper')

const addUser = exports.addUser = function(userId) {
    return User.create({
        userId,
        partyIds: [],
    })
}

const addPartyId = exports.addPartyId = function(userId, partyId) {
    return User.update({userId}, {$push: {partyIds: partyId}})
}

const getByUserId = exports.getByUserId = function(userId) {
    return User.findOne({userId})
}

exports.remove = function() {
    return User.remove()
}

exports.removePartyId = function(userId, partyId) {
    return User.findOne({userId})
        .then(res => {
            const partyIds = res.partyIds.filter(id => id !== partyId)
            return User.update({userId}, {$set: {partyIds: partyIds}})
        })
}

exports.addParty = function(userId, partyId) {
    return getByUserId(userId).then(user => {
            if (user) {
                return addPartyId(userId, partyId)
            }
            else {
                return addUser(userId).then(() => addPartyId(userId, partyId))
            }
        })
}