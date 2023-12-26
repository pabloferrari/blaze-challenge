const express = require('express');
const { teamIdRequest } = require('../middlewares');
const TeamsController = require('../controllers/TeamController');
const router = express.Router();

router.route('/teams/:teamId/matches').get(teamIdRequest, TeamsController.getMatches);
router.route('/teams/:teamId/players').get(teamIdRequest, TeamsController.getPlayers);

module.exports = router;
