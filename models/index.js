const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

require('./party')
require('./user')