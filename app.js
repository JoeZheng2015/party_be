const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
require('./models')
require('./setup-qcloud-sdk')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

const PORT = 80
const server = app.listen(PORT, () => {
    console.log(`server已启动在 http://localhost:${PORT}`)
})