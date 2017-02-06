function configureParty(party) {
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

const helpers = {
    configureParty,
}

module.exports = helpers
