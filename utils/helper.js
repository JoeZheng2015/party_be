exports.configureParty = function(party) {
    const defaultParty = {
        userId: 0,
        title: '标题',
        time: Date.now(),
        location: '地点',
        players: [],
    }

    party = Object.assign({}, defaultParty, party)

    return party
}

exports.getUserId = function(req) {
    return req.headers['x-wx-id']
}
