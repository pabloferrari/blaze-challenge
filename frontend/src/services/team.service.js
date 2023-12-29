import service from './service'

class TeamService {
    entity = 'teams'

    getTeams () {
        return service.get(`/${this.entity}`)
    }

    getMatchesByTeam (teamId) {
        return service.get(`/${this.entity}/${teamId}/matches`);
    }

    getPlayersByTeam (teamId) {
        return service.get(`/${this.entity}/${teamId}/players`);
    }

}

export default new TeamService()