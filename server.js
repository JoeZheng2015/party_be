const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const {configureParty} = require('./helpers')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/parties', (req, res) => {
    db.getAll()
        .then(result => {
            res.send(result)
        })
})

app.get('/parties/:id', (req, res) => {
    const id = req.params.id

    db.queryById(id)
        .then(result => {
            res.send(result)
        })
})

app.post('/parties', (req, res) => {
    const party = configureParty(req.body)

    db.add(party).then(() => {
        res.send({
            ret: 0,
            message: 'success'
        })
    }, () => {
        res.send({
            ret: 1,
        })
    })
})

app.post('/parties/:id', (req, res) => {
    const id = req.params.id
    const party = configureParty(req.body)

    db.update(id, party).then(() => {
        res.send({
            ret: 0,
            message: 'success'
        })
    }, () => {
        res.send({
            ret: 1,
        })
    })
})

const server = app.listen(8080, () => {
    console.log('server已启动在 http://localhost:8080')
})