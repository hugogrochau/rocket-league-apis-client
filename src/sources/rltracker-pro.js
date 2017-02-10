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

const handleResponse = (res) =>
  res.json()
    .then((data) => formatResponse(data))
    .catch((err) => ({ data: err, message: 'UnknownError' }));


export const formatResponse = (data) => {
  const info = formatRanks(data.ranking);
  info.name = data.player.nickname;
  info.id = data.player.player_id;
  return info;
};

export default { createRequest, handleResponse };
