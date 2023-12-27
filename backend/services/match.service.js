
const db = require('../config/database');
const TeamService = require('./team.service');

const MatchService = {};

MatchService.getRowsFromMatches = async () => {
    const result = await db.connection().query(`SELECT COUNT(*) as count FROM teams`);
    return result.rows[0].count;
}

MatchService.insertMatches = async (matches) => {

    const teamResults = await TeamService.getTeams();
    const teamIdMap = {};
    teamResults.rows.forEach(team => {
        teamIdMap[team.team_key] = team.id;
    });

    for (const match of matches) {
        try {
            if (match.match_status === "Finished") {
                await db.connection().query(
                    `INSERT INTO matches (match_id, team_home_id, team_away_id, league_name, match_date, match_hometeam_score, match_awayteam_score) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [match.match_id, teamIdMap[match.match_hometeam_id], teamIdMap[match.match_awayteam_id], match.league_name, match.match_date, match.match_hometeam_score, match.match_awayteam_score]
                );
            }
        } catch (err) {
            throw err;
        }
    }
}

MatchService.getByTeam = async (teamId) => {
    const matchResults = await db.connection().query(`SELECT * FROM matches WHERE team_home_id = $1 OR team_away_id = $1;`, [teamId]);
    return matchResults.rows;
}



module.exports = MatchService;