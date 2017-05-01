const {Party, User} = require('../proxy')
const {configureParty, getUserId, configurePlayer} = require('../utils/helper')

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
            const player = configurePlayer(party.player, userId)

            Party.addPlayer(partyId, player)

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
    const partyId = req.params.id
    const player = configurePlayer(req.body, getUserId(req))

    Party.getById(partyId)
        .then(party => {
            const hasJoined = party.players.findIndex(p => p.userId === player.userId) !== -1
            if (hasJoined) {
                const players = party.players.filter(p => p.userId !== player.userId)
                return Party.decreasePlayer(partyId, players)
            }
            else {
                return Party.addPlayer(partyId, player)
            }
        })
        .then(() => Party.getById(partyId))
        .then(party => {
            res.send({
                ret: 0,
                party,
            })
        }, (err = '') => {
            res.send({
                ret: 1,
                mes: err,
            })
        })
}

exports.addPlayer = function(id, player) {
    return Party.update(
        {_id: id},
        {$push: {players: player}},
        {},
        (res) => {
            console.log('-', res)
        }
    )
}
