# rocket-league-apis-client
Client for pulling data from various rocket league apis

[![NPM Version](https://img.shields.io/npm/v/rocket-league-apis-client.svg)](https://www.npmjs.com/package/rocket-league-apis-client)

[![License](https://img.shields.io/github/license/hugogrochau/rocket-league-apis-client.svg)](https://github.com/hugogrochau/rocket-league-apis-client/blob/master/LICENSE)

# Usage
```js
import rankApis, { TRACKERS } from 'rocket-league-rank-apis-client'

const API_KEY;
const platform = 0; // 0 = steam, 1 = ps4, 2 = xbox
const id = 'freedomrl'; // steam vanity id, STEAM64 id, or xbox/ps4 handle
rankApis.getPlayerInformation(platform, id, API_KEY, TRACKERS.RLTRACKER_PRO)
```

# Supported trackers
* RLTRACKER_PRO = http://rltracker.pro
* ROCKETLEAGUE_TRACKER_NETWORK = http://rocketleague.tracker.network

# Player information schema
```js
{
  "1v1": "1v1 rank",
  "1v1_division": "1-5",
  "1v1_tier": "1v1 tier (0-15 i.e. unranked to GC)",
  "...": "same for 2v2,3v3,3v3s",
  "name": "Player name",
  "id": "Player id (xbox/psn handle or STEAM64 id)"
}
```

## Authors
* @hugogrochau
