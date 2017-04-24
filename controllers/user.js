const {User} = require('../proxy')
const {getUserId} = require('../utils/helper')

exports.deleteParty = function(req, res) {
    const partyId = req.params.id
    const userId = getUserId(req)

    console.log('-', partyId, userId)
    User.removePartyId(userId, partyId)
        .then(() => {
            console.log('---')
            res.send({
                ret: 1,
            })
        })
}