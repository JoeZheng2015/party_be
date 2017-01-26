const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

const server = app.listen(8080, () => {
    console.log('server已启动在 http://localhost:8080')
})