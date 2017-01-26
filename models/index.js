const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

require('./party')

exports.Party = mongoose.model('Party')