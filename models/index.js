const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/party')

require('./party')
require('./user')