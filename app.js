const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
require('./models')
const cookieParser = require('cookie-parser')
require('./setup-qcloud-sdk')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', router)

const server = app.listen(8080, () => {
    console.log('server已启动在 http://localhost:8080')
})