const express = require('express');
const { teamIdRequest } = require('../middlewares');
const TeamsController = require('../controllers/TeamController');

function initializeRoutes(app) {
    const router = express.Router();

    router.route('/teams/').get(TeamsController.getTeams);
    router.route('/teams/:teamId/matches').get(teamIdRequest, TeamsController.getMatchesByTeam);
    router.route('/teams/:teamId/players').get(teamIdRequest, TeamsController.getPlayersByTeam);

    router.route('/*').all((req, res) => res.status(404).json({ message: "Route not found" }));

    app.use(router);
}

module.exports = { initializeRoutes };
