const db = require('../config/database');

const PlayerService = {};

PlayerService.insertPlayer = async (player_key, player_name, number, teamId, player_type) => {

    try {
        await db.connection().query(
            `INSERT INTO players (player_key, player_name, player_number, team_id, player_type) VALUES ($1, $2, $3, $4, $5)`,
            [player_key, player_name, number, teamId, player_type]
        );
    } catch (error) {
        throw error
    }
}

PlayerService.getByTeam = async (teamId) => {
    try {
        const result = await db.connection().query('SELECT * FROM players WHERE team_id = $1;', [teamId]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

module.exports = PlayerService