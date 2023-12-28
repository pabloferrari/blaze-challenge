const { getApiFootballTeams, getApiFootballMatches } = require('../utils/apifootball');
const TeamService = require('../services/team.service');
const MatchService = require('../services/match.service');
const PlayerService = require('../services/player.service');
const { getDateMinusDays } = require('./dateHelper');

const TABLES = ['teams', 'matches'];

const checkIfTablesAreEmpty = async () => {
    for (const tableName of TABLES) {
        try {
            const rowCount = await getRowCount(tableName);

            if (rowCount === 0) {
                console.log(`Table ${tableName} is empty. Populating it...`);
                await fillTable(tableName);
            } else {
                console.log(`Table ${tableName} is not empty (${rowCount}). No need to fill it.`);
            }
        } catch (error) {
            console.error(`Error checking table ${tableName}:`, error.message);
        }
    }
};

const getRowCount = async (tableName) => {
    try {
        if (tableName === 'teams') {
            return await TeamService.getRowsFromTeams();
        } else if (tableName === 'matches') {
            return await MatchService.getRowsFromMatches();
        }
    } catch (error) {
        throw error;
    }
};

const fillTable = async (tableName) => {
    try {
        if (tableName === 'teams') {
            await fillTeamsTable();
        } else if (tableName === 'matches') {
            await fillMatchesTable();
        }
    } catch (error) {
        console.error(`Error filling table ${tableName}:`, error.message);
    }
};

const fillTeamsTable = async () => {
    const teams = await getApiFootballTeams();

    for (const team of teams) {
        try {
            const teamId = await TeamService.insertTeam(team);
            await insertPlayers(teamId, team.players);
            console.log(`Team inserted with ID ${teamId}`);
        } catch (error) {
            throw error;
        }
    }
};

const insertPlayers = async (teamId, players) => {
    for (const player of players) {
        try {
            const number = player.player_number || null;
            await PlayerService.insertPlayer(player, teamId, number);
        } catch (error) {
            throw error;
        }
    }
};

const fillMatchesTable = async () => {
    const matches = await getApiFootballMatches(getDateMinusDays(30));
    await MatchService.insertMatches(matches);
};

const getLastMatches = async () => {
    try {
        const matches = await getApiFootballMatches(getDateMinusDays(1));
        await MatchService.insertMatches(matches);
    } catch (error) {
        console.error('Error getting and inserting last matches:', error.message);
    }
};

module.exports = {
    checkIfTablesAreEmpty,
    getLastMatches
};
