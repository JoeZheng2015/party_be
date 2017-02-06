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
        .then(data => Party.addPlayer(data._id, party.player))
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
