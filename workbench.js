const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', (req, res) => {
    res.send('hello')
})

const server = app.listen(8080, () => {
    console.log('server已启动在 http://localhost:8080')
})