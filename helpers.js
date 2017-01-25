function configureParty({userId = 0, title = '标题', time = Date.now(), location = '地点', numberOfPlayer = 0}) {
    const formattedTime = typeof time === 'string' ? +new Date(time) : time
    console.log(time, formattedTime)

    const party = {
        userId,
        title,
        time: formattedTime,
        location,
        numberOfPlayer,
    }

    return party
}

const helpers = {
    configureParty,
}

module.exports = helpers
