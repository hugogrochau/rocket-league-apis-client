import rltn from './sources/rocket-league-tracker-network'
import rltrackerPro from './sources/rltracker-pro'

export const TRACKER = {
  ROCKETLEAGUE_TRACKER_NETWORK: 'Rocket League Tracker Network',
  RLTRACKER_PRO: 'rltracker.pro',
}

const getPlayerInformation = (platform, id, apiKey, tracker) => {
  if (!apiKey) {
    return Promise.reject('No api key')
  }
  switch (tracker) {
    default:
    case TRACKER.ROCKETLEAGUE_TRACKER_NETWORK:
      return rltn.getPlayerInformation(platform, id, apiKey)
    case TRACKER.RLTRACKER_PRO:
      return rltrackerPro.getPlayerInformation(platform, id, apiKey)
  }
}

export default { getPlayerInformation }
