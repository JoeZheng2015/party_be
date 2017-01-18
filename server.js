const express = require('express')
const operation = require('./query')
const app = express()

app.get('/index.html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/get', (req, res) => {
    operation.query(result => {
        res.json(result);
    })
})

const server = app.listen(8080, () => {
    console.log('启动server')
})