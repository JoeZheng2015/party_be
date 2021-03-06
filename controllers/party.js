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
    const userId = getUserId(req)
    const party = configureParty(Object.assign({}, req.body, {userId}))

    Party.add(party)
        .then(data => {
            const partyId = data._id
            const player = configurePlayer(party.player, userId)

            Party.addPlayer(partyId, player)

            return User.addParty(userId, partyId)
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
    const userId = getUserId(req)

    if (req.body.isAmend) {
        const party = configureParty(Object.assign({}, req.body, {userId}))
        Party.update(partyId, party)
            .then(() => {
                res.send({
                    ret: 0,
                })
            })
    }
    else {
        const player = configurePlayer(req.body, userId)

        Party.getById(partyId)
            .then(party => {
                const hasJoined = party.players.findIndex(p => p.userId === userId) !== -1
                if (hasJoined) {
                    const players = party.players.filter(p => p.userId !== userId)
                    return Party.decreasePlayer(partyId, players)
                }
                else {
                    return Party.addPlayer(partyId, player).then(() => User.addParty(userId, partyId))
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
