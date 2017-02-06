const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

require('./user.test')
require('./party.test')
