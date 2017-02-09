# rocket-league-rank-apis-client
Client for pulling data from various rocket league rank apis

# Usage
```js
import rankApis, { TRACKERS } from 'rocket-league-rank-apis-client'

const API_KEY;

rankApis.getPlayerInformation(0, 'freedomrl', API_KEY, TRACKERS.RLTRACKER_PRO)
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
