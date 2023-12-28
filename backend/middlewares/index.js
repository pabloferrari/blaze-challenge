const TeamService = require('../services/team.service');

const teamIdRequest = async (req, res, next) => {
    try {
        const { teamId } = req.params;

        if (!Number.isNaN(Number(teamId))) {
            const team = await TeamService.getTeamById(teamId);

            if (team) {
                return next();
            } else {
                return next({ status: 404, message: 'Team not found' });
            }
        } else {
            return next({ status: 400, message: 'Invalid teamId' });
        }
    } catch (error) {
        console.error('Error in teamIdRequest middleware:', error);
        return next({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {
    teamIdRequest
};
