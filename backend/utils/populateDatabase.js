const { getApiFootballTeams, getApiFootballMatches } = require('../utils/apifootball');
const TeamService = require('../services/team.service');
const MatchService = require('../services/match.service');
const PlayerService = require('../services/player.service');
const { getDateMinusDays } = require('./dateHelper');

// Function to check if tables are empty
const checkIfTablesAreEmpty = async () => {
    const tablesToCheck = ['teams', 'matches'];

    for (const tableName of tablesToCheck) {
        let rowCount = 0;
        if (tableName === 'teams') {
            rowCount = await TeamService.getRowsFromTeams();
        } else if (tableName === 'matches') {
            rowCount = await MatchService.getRowsFromMatches();
        }

        if (rowCount === '0') {
            console.log(`Table ${tableName} is empty. Populating it...`);
            await fillTable(tableName);
        } else {
            console.log(`Table ${tableName} is not empty (${rowCount}). No need to fill it.`);
        }
    }
}

// Function to fill tables
const fillTable = async () => {
    if (tableName === 'teams') {
        const teams = await getApiFootballTeams();

        teams.forEach(async team => {
            const { team_key, team_name, venue, players } = team;
            try {
                const teamId = await TeamService.insertTeam(team_key, team_name, venue.venue_name);
                for (const player of players) {
                    try {
                        const number = player.player_number || null;
                        await PlayerService.insertPlayer(player.player_key, player.player_name, number, teamId, player.player_type);
                    } catch (err) {
                        throw err;
                    }
                }

                console.log(`Team inserted with ID ${teamId}`);
            } catch (error) {
                throw error;
            }

        });
    } else if (tableName === 'matches') {
        const matches = await getApiFootballMatches(getDateMinusDays(30));
        await MatchService.insertMatches(matches);
    }

}

const lastMatches = async () => {
    const matches = await getApiFootballMatches(getDateMinusDays(1));
    await MatchService.insertMatches(matches);
}

module.exports = {
    checkIfTablesAreEmpty,
    lastMatches
}
