import toPairs from 'lodash/toPairs';

const playlistMap = {
  10: '1v1',
  11: '2v2',
  12: '3v3s',
  13: '3v3',
};

/* extract ranks from api stats object */
const formatRanks = (ranks) => {
  const formattedRanks = {};
  toPairs(ranks).forEach((rank) => {
    const playlist = playlistMap[rank[0]];
    const values = rank[1];
    formattedRanks[playlist] = parseInt(values.rating, 10);
    formattedRanks[`${playlist}_games_played`] = parseInt(values.matches_played, 10);
    formattedRanks[`${playlist}_division`] = parseInt(values.division, 10);
    formattedRanks[`${playlist}_tier`] = parseInt(values.tier_id, 10);
  });
  return formattedRanks;
};

const createRequest = (apiUrl, apiKey, platform, id) => {
  const query = {
    api_key: apiKey,
    platform: platform + 1, // rltracker conversion
    id,
  };
  return { url: apiUrl, query };
};

const handleResponse = (res) => {
  if (res.status >= 400) {
    if (res.status === 404) {
      return Promise.reject({ data: res, message: 'PlayerNotFound' });
    }
    return Promise.reject({ data: res, message: 'UnknownError' });
  }
  return res.json()
    .then((data) => data)
    // TODO: study possible rltracker errors
    .catch((err) => ({ data: err, message: 'UnknownError' }));
};

const formatPlayerResponse = (data) => ({
  player: {
    id: data.player.player_id,
    platform: parseInt(data.player.platform_id, 10) - 1,
    name: data.player.nickname,
    ...formatRanks(data.ranking),
  },
});

export default { createRequest, handleResponse, formatPlayerResponse };
