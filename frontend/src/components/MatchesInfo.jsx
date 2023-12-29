import React, { useState, useEffect } from 'react';
import TeamService from '../services/team.service';

const MatchesInfo = ({ teamId, allTeams }) => {
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [teamNames, setTeamNames] = useState({});
    const [teamVenues, setTeamVenues] = useState({});

    useEffect(() => {
        const teamN = {};
        const teamV = {};
        allTeams.forEach(team => {
            teamN[team.id] = team.team_name;
            teamV[team.id] = team.venue;
        })
        setTeamNames(teamN);
        setTeamVenues(teamV);
    }, [allTeams]);

    useEffect(() => {
        if (!teamId) return;

        TeamService.getMatchesByTeam(teamId)
        .then(response => {
            const matches = [];
            response.forEach(match => {
                matches.push({
                    id: match.id,
                    league: match.league_name,
                    stadium: teamVenues[match.team_home_id],
                    date: match.match_date.split('T')[0],
                    teamHome: teamNames[match.team_home_id],
                    teamAway: teamNames[match.team_away_id],
                    teamHomeScore: match.match_hometeam_score,
                    teamAwayScore: match.match_awayteam_score
                });
            });
            matches.reverse();
            setMatchesInfo(matches);
        })
        .catch(err => {
            console.log(err);
        })
    }, [teamId]);

    return (
      <div className="mt-4">
        {matchesInfo.length > 0 ? (
        <>
          <h2 className="mb-3">Last Matches:</h2>
          <div className="card-container">
          {matchesInfo.map((match, i) => (
            <div key={match.id} className={`card ${i === 0 ? 'first-card' : ''}`}>
              <h3>{match.teamHome} vs {match.teamAway}</h3>
              <p className="result"><strong>Result:</strong> {match.teamHomeScore} - {match.teamAwayScore}</p>
              <p><strong>Date:</strong> {match.date}</p>
              <p><strong>Stadium:</strong> {match.stadium}</p>
              <p><strong>League:</strong> {match.league}</p>
            </div>
          ))}
          </div>
        </>
        ) : (
        <></>
        )}
      </div>
    );
};

export default MatchesInfo;
