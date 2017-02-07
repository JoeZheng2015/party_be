const mongoose = require('mongoose')
const User = require('../proxy/user')
const assert = require('assert')

const partyIds = '123acb'

User.remove()
    .then(() => User.getByUserId(0))
    .then(res => assert.equal(res.length, 0))
    .then(() => User.addUser(0))
    .then(user => assert.equal(user.userId, 0))
    .then(() => User.addPartyId(0, partyIds))
    .then(() => User.getByUserId(0))
    .then(res => assert.equal(res[0].partyIds, partyIds))
    .then(() => User.remove())
    .then(() => User.getByUserId(0))
    .then(res => assert.equal(res.length, 0))
    .catch(error => console.log(error))
    .then(() => console.log('user test done!'))