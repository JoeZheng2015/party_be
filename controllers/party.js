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

    Party.add(party).then(() => {
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
    const party = configureParty(req.body)

    Party.update(id, party).then(() => {
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
