# API Documentation

## Overview

This API is designed to provide information about football teams, matches, and players. The application initializes by checking if the tables are empty and attempts to populate them with initial data if they are.

## Endpoints

### 1. Get List of Teams

#### Endpoint

```http
GET /teams/
```

#### Description

Retrieves a list of football teams.

#### Response

- Status Code: `200 OK`
- Body:

```json
[
  {
    "id": 1,
    "team_key": 1,
    "team_name": "Team A",
    "venue": "Stadium A"
  },
  {
    "id": 2,
    "team_key": 5,
    "team_name": "Team B",
    "venue": "Stadium B"
  },
  ...
]
```

### 2. Get Matches by Team

#### Endpoint

```http
GET /teams/:teamId/matches
```

#### Parameters

- `teamId`: A valid numeric identifier for the team.

#### Description

Retrieves a list of matches for a specific football team.

#### Response

- Status Code: `200 OK`
- Body:

```json
[
  {
    "id": 1,
    "match_id": 123456,
    "team_home_id": 19,
    "team_away_id": 4,
    "league_name": "Premier League",
    "match_date": "2023-12-02T00:00:00.000Z",
    "match_hometeam_score": 1,
    "match_awayteam_score": 0
  },
  {
    "id": 14,
    "match_id": 206445,
    "team_home_id": 4,
    "team_away_id": 3,
    "league_name": "Premier League",
    "match_date": "2023-12-06T00:00:00.000Z",
    "match_hometeam_score": 2,
    "match_awayteam_score": 1
  },
  ...
]
```

### 3. Get Players by Team

#### Endpoint

```http
GET /teams/:teamId/players
```

#### Parameters

- `teamId`: A valid numeric identifier for the team.

#### Description

Retrieves a list of players for a specific football team.

#### Response

- Status Code: `200 OK`
- Body:

```json
[
  {
    "id": 103,
    "player_key": "818595784",
    "player_name": "A. Bayındır",
    "player_number": 1,
    "team_id": 4,
    "player_type": "Goalkeepers"
  },
  {
    "id": 109,
    "player_key": "2491426406",
    "player_name": "Lisandro Martínez",
    "player_number": 6,
    "team_id": 4,
    "player_type": "Defenders"
  },
  ...
]
```

## Notes

- Ensure that the `teamId` parameter is a valid numeric identifier when making requests to the `/teams/:teamId/matches` and `/teams/:teamId/players` endpoints.