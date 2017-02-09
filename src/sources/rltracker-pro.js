import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import toPairs from 'lodash/toPairs'

const API_URL = 'http://rltracker.pro/api/profile/get'

const playlistMap = {
  10: '1v1',
  11: '2v2',
  12: '3v3s',
  13: '3v3',
}

/* extract ranks from api stats object */
const formatRanks = (ranks) => {
  const formattedRanks = {}
  toPairs(ranks).forEach((rank) => {
    const playlist = playlistMap[rank[0]]
    const values = rank[1]
    formattedRanks[playlist] = values.rating
    formattedRanks[`${playlist}_games_played`] = values.matches_played
    formattedRanks[`${playlist}_division`] = values.division
    formattedRanks[`${playlist}_tier`] = values.tier_id
  })
  return formattedRanks
}

const getPlayerInformation = (platform, id, apiKey) =>
  new Promise((resolve, reject) => {
    const rltPlatform = platform + 1
    const query = querystring.stringify({
      api_key: apiKey,
      platform: rltPlatform,
      id,
    })
    return fetch(`${API_URL}?${query}`)
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
        const info = formatRanks(jsonData.ranking)
        info.name = jsonData.player.nickname
        info.id = jsonData.player.player_id
        resolve(info)
      })
      .catch((err) => reject(err))
  })

export default { getPlayerInformation }
