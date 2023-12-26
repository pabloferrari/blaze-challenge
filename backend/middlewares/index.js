
const teamIdRequest = (req, res, next) => {

    const { teamId } = req.params;
    console.log(`teamIdRequest(${teamId})`)
    return next()
}

module.exports = {
    teamIdRequest,
}
