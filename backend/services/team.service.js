
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


TeamService.getPlayersByTeam = async (teamId) => {

}

TeamService.insertTeam = async (team_key, team_name, venue) => {
    try {
        const teamResult = await db.connection().query(`INSERT INTO ${tableName} (team_key, team_name, venue) VALUES ($1, $2, $3) RETURNING id`, [team_key, team_name, venue]);
        return teamResult.rows[0].id;
    } catch (error) {
        throw error
    }
}

module.exports = TeamService;