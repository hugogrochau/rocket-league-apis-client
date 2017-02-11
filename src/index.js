import { getPlayerInformation } from './requests';
import RocketLeagueTrackerNetwork from './trackers/rocket-league-tracker-network';
import RLTrackerPro from './trackers/rltracker-pro';

export const TRACKER = {
  ROCKETLEAGUE_TRACKER_NETWORK: 'Rocket League Tracker Network',
  RLTRACKER_PRO: 'rltracker.pro',
};

const defaultOptions = {
  tracker: TRACKER.RLTRACKER_PRO,
  apiUrl: 'http://rltracker.pro/api/profile/get',
};

const trackers = {
  [TRACKER.ROCKETLEAGUE_TRACKER_NETWORK]: RocketLeagueTrackerNetwork,
  [TRACKER.RLTRACKER_PRO]: RLTrackerPro,
};

export default (options) => {
  if (!options || !options.apiKey) {
    throw new Error('You must provide an apiKey');
  }

  const { tracker, apiUrl, apiKey } = { ...defaultOptions, ...options };

  if (!trackers[tracker]) {
    throw new Error(`Invalid tracker: ${tracker}`);
  }

  return (platform, id) =>
    getPlayerInformation(trackers[tracker], apiUrl, apiKey, platform, id);
};
