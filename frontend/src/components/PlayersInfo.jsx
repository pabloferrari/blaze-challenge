import React, { useState, useEffect } from 'react';
import TeamService from '../services/team.service';

const PlayersInfo = ({ teamId }) => {
  const [playersInfo, setPlayersInfo] = useState([]);

  useEffect(() => {
    if (!teamId) return;

    TeamService.getPlayersByTeam(teamId)
    .then(response => {
      setPlayersInfo(response)
    })
    .catch(err => {
        console.log(err);
    })
  }, [teamId]);

  return (
    <div className="mt-4">
      {playersInfo.length > 0 ? (
        <>
          <h2 className="mb-3">Players:</h2>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Number</th>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {playersInfo.map(player => (
                <tr key={player.id}>
                  <td>{player.player_number}</td>
                  <td>{player.player_type}</td>
                  <td>{player.player_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayersInfo;
