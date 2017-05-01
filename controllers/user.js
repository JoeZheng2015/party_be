const {User} = require('../proxy')
const {getUserId} = require('../utils/helper')

exports.deleteParty = function(req, res) {
    const partyId = req.params.id
    const userId = getUserId(req)

    User.removePartyId(userId, partyId)
        .then(() => {
            res.send({
                ret: 0,
            })
        })
}