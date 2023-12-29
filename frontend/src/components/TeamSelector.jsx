import React, { useState, useEffect } from 'react';
import TeamService from '../services/team.service';

const TeamSelector = ({ onSelectTeam, onLoadTeams }) => {
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        TeamService.getTeams()
        .then(response => {
            onLoadTeams(response);
            setTeams(response);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleTeamChange = (event) => {
        const teamId = event.target.value;
        setSelectedTeam(teamId);
        onSelectTeam(teamId);
        setTeam(teams.find(t => t.id == teamId))
    };

    return (
        <div className="team-selector">
            <label className="label">Select Team:</label>
            <select className="select" value={selectedTeam} onChange={handleTeamChange}>
                <option value="">Select</option>
                {teams.map((team) => (
                <option key={team.id} value={team.id}>
                    {team.team_name}
                </option>
                ))}
            </select>

            {selectedTeam && (
                <h2 className="team-heading">Team: {team.team_name}</h2>
            )}
        </div>
    );
};

export default TeamSelector;
