import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const API_URL = 'https://20kiyaost7.execute-api.us-west-2.amazonaws.com/prod'

const playlistMap = {
  'Ranked Duel 1v1': '1v1',
  'Ranked Doubles 2v2': '2v2',
  'Ranked Solo Standard 3v3': '3v3s',
  'Ranked Standard 3v3': '3v3',
}

const rankMap = {
  'Grand Champion': 15,
  'Super Champion': 14,
  Champion: 13,
  Superstar: 12,
  'All-Star': 11,
  'Shooting Star': 10,
  'Rising Star': 9,
  'Challenger Elite': 8,
  'Challenger III': 7,
  'Challenger II': 6,
  'Challenger I': 5,
  'Prospect Elite': 4,
  'Prospect III': 3,
  'Prospect II': 2,
  'Prospect I': 1,
  Unranked: 0,
}

const divisionMap = {
  V: 5,
  IV: 4,
  III: 3,
  II: 2,
  I: 1,
}

/* extract ranks from api stats object */
const getRanksFromInformation = (stats) => {
  const ranks = {}
  stats.forEach((stat) => {
    const playlist = playlistMap[stat.label]

    if (playlist) {
      ranks[playlist] = stat.value
      // extract division and rank
      const regex = /\[(\w{1,3})\]\s(.*)/
      const matched = regex.exec(stat.subLabel)
      ranks[`${playlist}_division`] = divisionMap[matched[1]]
      ranks[`${playlist}_tier`] = rankMap[matched[2]]
    }
  })
  return ranks
}


const getPlayerInformation = (platform, id, apiKey) =>
  new Promise((resolve, reject) => {
    const rltPlatform = 3 - platform
    const query = querystring.stringify({
      platform: rltPlatform,
      name: id,
    })

    return fetch(`${API_URL}?${query}`, {
      headers: { 'X-API-KEY': apiKey },
    })
    .then((res) => {
      if (res.status >= 400) {
        return reject(res)
      }
      try {
        return res.json()
      } catch (err) {
        return reject(res)
      }
    })
    .then((jsonData) => {
      const info = getRanksFromInformation(jsonData.stats)
      info.name = jsonData.platformUserHandle
      info.id = jsonData.platformUserId
      resolve(info)
    })
    .catch((err) => reject(err))
  })

export default { getPlayerInformation }
