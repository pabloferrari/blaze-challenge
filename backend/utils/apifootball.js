const axios = require('axios');
const { API_KEY } = require('../config/environments');
const { getDateMinusDays, getFormattedDate } = require('./dateHelper');

const apiUrl = 'https://apiv3.apifootball.com/';
// it is considered to import only teams from a specific league
const leagueId = '152';

const getApiFootballTeams = async () => {
    return await call(`${apiUrl}?action=get_teams&league_id=${leagueId}`);
}

const getApiFootballMatches = async (dateFrom = null) => {
    const fromDate = dateFrom || getDateMinusDays(1);
    const toDate = getFormattedDate();
    const data = await call(`${apiUrl}?action=get_events&from=${fromDate}&to=${toDate}&league_id=${leagueId}`);
    return data;

}

const call = async (url) => {
    try {
        const response = await axios.get(`${url}&APIkey=${API_KEY}`);
        const { data } = response;
        return data;
    } catch (error) {
        console.error(`Something went wrong`, error);
        return [];
    }
}

module.exports = {
    getApiFootballTeams,
    getApiFootballMatches
}