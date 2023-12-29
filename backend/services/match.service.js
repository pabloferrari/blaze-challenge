const db = require('../config/database');
const TeamService = require('./team.service');

const MatchService = {};

MatchService.getRowsFromMatches = async () => {
    const result = await db.connection().query('SELECT COUNT(*) as count FROM matches;');
    return result.rows[0].count;
};

MatchService.insertMatches = async (matches) => {
    const teamIdMap = await TeamService.getTeamIdMap();
    const matchIds = matches.map(match => match.match_id);
    const existingMatches = await MatchService.getMatchesByMatchIds(matchIds);
    const existingMatchesMap = new Map(existingMatches.map(match => [`${match.match_id}`, match.id]));

    for (const match of matches) {
        if (match.match_status === 'Finished') {
            const existingMatch = existingMatchesMap.get(match.match_id);
            if (!existingMatch) {
                await insertSingleMatch(match, teamIdMap);
            }
        }
    }
};

MatchService.getMatchesByMatchIds = async (matchIds) => {
    const result = await db.connection().query('SELECT id,match_id FROM matches WHERE match_id = ANY($1)', [matchIds]);
    return result.rows;
};

async function insertSingleMatch(match, teamIdMap) {
    try {
        await db.connection().query(
            'INSERT INTO matches (match_id, team_home_id, team_away_id, league_name, match_date, match_hometeam_score, match_awayteam_score) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [
                match.match_id,
                teamIdMap[match.match_hometeam_id],
                teamIdMap[match.match_awayteam_id],
                match.league_name,
                match.match_date,
                match.match_hometeam_score,
                match.match_awayteam_score,
            ]
        );
    } catch (err) {
        throw err;
    }
}

MatchService.getByTeam = async (teamId) => {
    const matchResults = await db.connection().query('SELECT * FROM matches WHERE team_home_id = $1 OR team_away_id = $1;', [teamId]);
    return matchResults.rows;
};

module.exports = MatchService;
