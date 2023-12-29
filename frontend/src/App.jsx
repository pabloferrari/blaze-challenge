import React, { useState } from 'react';
import TeamSelector from './components/TeamSelector';
import PlayersInfo from './components/PlayersInfo';
import MatchesInfo from './components/MatchesInfo';

const App = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Challenge API Football</h1>
      <div className="row">
        <TeamSelector onSelectTeam={setSelectedTeam} onLoadTeams={setTeams} />
      </div>
      <div className="row">
        <div className="col-md-6">
          <PlayersInfo allTeams={teams} teamId={selectedTeam} />
        </div>
        <div className="col-md-6">
          <MatchesInfo allTeams={teams} teamId={selectedTeam} />
        </div>
      </div>
    </div>
  );
};

export default App;
