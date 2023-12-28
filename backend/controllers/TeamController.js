const TeamService = require('../services/team.service');
const MatchService = require('../services/match.service');
const PlayerService = require('../services/player.service');

const TeamController = {}

const handleRequest = async (res, serviceFunction, params) => {
    try {
        const result = await serviceFunction(params);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

TeamController.getTeams = async (req, res) => {
    await handleRequest(res, TeamService.getTeams);
};

TeamController.getMatchesByTeam = async (req, res) => {
    const { teamId } = req.params;
    await handleRequest(res, MatchService.getByTeam, teamId);
};

TeamController.getPlayersByTeam = async (req, res) => {
    const { teamId } = req.params;
    await handleRequest(res, PlayerService.getByTeam, teamId);
};

module.exports = TeamController;
