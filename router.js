const express = require('express')
const party = require('./controllers/party')
const LoginService = require('qcloud-weapp-server-sdk').LoginService

const router = express.Router()


router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

router.get('/login', (req, res) => {
    LoginService.create(req, res).login() 
})

router.get('/parties', party.getParties)

router.get('/parties/:id', party.getById)

router.post('/parties', party.add)

router.post('/parties/:id', party.update)

module.exports = router
