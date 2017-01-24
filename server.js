const express = require('express')
const db = require('./db')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/get', (req, res) => {
    db.queryById(1, (err, result) => {
        res.send(result)
    })
})

const server = app.listen(8080, () => {
    console.log('server已启动在http://localhost:8080')
})