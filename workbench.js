const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const UserSchema = new mongoose.Schema({
    userId: Number,
    partyIds: [String],
})

const User = mongoose.model('User', UserSchema)
const ids = []

User.create({
    userId: 0,
    partyIds: []
})
.then(res => {
    ids.push(res._id)

    return User.create({
        userId: 1,
        partyIds: ['abd']
    })
})
.then(res => ids.push(res._id))
.then(() => User.find({}))
.then(() => User.find({$or: ids.map(id => ({_id: id}))}))
.then(res => console.log(res))
.then(() => User.remove())
.then(() => {
    console.log('remove done')
})