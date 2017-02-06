const mongoose = require('mongoose')
const Party = require('../proxy/party')
const assert = require('assert')

let partyId = 0
const player = {
    name: 'joe'
}

Party.remove()
    .then(() => Party.getAll())
    .then(parties => assert.equal(parties.length, 0))
    .then(() => Party.add({userId: 0, title: '标题', time: Date.now(), location: '地址', players: []}))
    .then(party => {
        partyId = party._id
    })
    .then(() => Party.getAll())
    .then(parties => assert.equal(parties.length, 1))
    .then(() => Party.addPlayer(partyId, player))
    .then(() => Party.getById(partyId))
    .then(party => assert.deepEqual(party.players[0], player))
    .then(() => Party.remove())
    .catch(error => console.log(error))
    .then(() => console.log('party test done!'))
