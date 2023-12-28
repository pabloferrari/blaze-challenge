
const db = require('../config/database');

const TeamService = {};
TeamService.getRowsFromTeams = async () => {
    const result = await db.connection().query(`SELECT COUNT(*) as count FROM teams`);
    return result.rows[0].count;
}

TeamService.getTeams = async () => {
    const teamResults = await db.connection().query(`SELECT * FROM teams;`);
    return teamResults.rows;
}


TeamService.getTeamById = async (teamId) => {
    try {
        const teamResult = await db.connection().query(`SELECT * FROM teams WHERE id = $1;`, [teamId]);
        if (teamResult.rowCount !== 1) return;
        return teamResult.rows[0];
    } catch (error) {
        throw error
    }
}

TeamService.insertTeam = async (team_key, team_name, venue) => {
    try {
        const teamResult = await db.connection().query(`INSERT INTO teams (team_key, team_name, venue) VALUES ($1, $2, $3) RETURNING id`, [team_key, team_name, venue]);
        return teamResult.rows[0].id;
    } catch (error) {
        throw error
    }
}

TeamService.getTeamIdMap = async () => {
    const teamResults = await TeamService.getTeams();
    const teamIdMap = {};
    teamResults.forEach(team => {
        teamIdMap[team.team_key] = team.id;
    });

    return teamIdMap;
}

module.exports = TeamService;