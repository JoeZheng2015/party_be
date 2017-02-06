const {Party} = require('../proxy')
const {configureParty} = require('../helpers')

exports.getAll = function(req, res) {
    Party.getAll()
        .then(result => {
            res.send(result)
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
        .then(data => exports.addPlayer(data._id, party.player))
        .then(() => {
            res.send({
                ret: 0,
                message: 'success'
            })
        }, () => {
            res.send({
                ret: 1,
            })
        })
}

exports.update = function (req, res) {
    const id = req.params.id
    const player = configureParty(req.body)

    exports.addPlayer(id, player)
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

exports.addPlayer = function (id, player) {
    return Party.update(
        {_id: id},
        {$push: {players: player}}
    )
}
