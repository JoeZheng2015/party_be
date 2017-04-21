const {Party, User} = require('../proxy')
const {configureParty, getUserId} = require('../utils/helper')

exports.getParties = function(req, res) {
    const userId = getUserId(req)

    User.getByUserId(userId)
        .then(user => Party.getByIds(user.partyIds))
        .then(parties => {
            res.send(parties)
        })
}

exports.getById = function(req, res) {
    const id = req.params.id

    Party.getById(id)
        .then(result => {
            res.send(result)
        })
}

exports.add = function (req, res) {
    const party = configureParty(req.body)

    Party.add(party)
        .then(data => {
            const userId = getUserId(req)
            const partyId = data._id
            Party.addPlayer(partyId, party.player)

            return User.getByUserId(userId).then(user => {
                    if (user) {
                        return User.addPartyId(userId, partyId)
                    }
                    else {
                        return User.addUser(userId).then(() => User.addPartyId(userId, partyId))
                    }
                })
        })
        .then(() => {
            res.send({
                ret: 0,
                message: 'success'
            })
        }, (error) => {
            console.error(error)

            res.send({
                ret: 1,
            })
        })
}

exports.update = function (req, res) {
    const id = req.params.id
    const player = configureParty(req.body)

    Party.addPlayer(id, player)
        .then(() => Party.getById(id))
        .then(party => {
            res.send({
                ret: 0,
                party,
            })
        }, () => {
            res.send({
                ret: 1,
            })
        })
}

exports.addPlayer = function(id, player) {
    console.log(Party, Party.update)
    return Party.update(
        {_id: id},
        {$push: {players: player}},
        {},
        (res) => {
            console.log('-', res)
        }
    )
}
