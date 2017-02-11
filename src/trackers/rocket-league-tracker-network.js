const playlistMap = {
  'Ranked Duel 1v1': '1v1',
  'Ranked Doubles 2v2': '2v2',
  'Ranked Solo Standard 3v3': '3v3s',
  'Ranked Standard 3v3': '3v3',
};

const tierMap = {
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
};

const divisionMap = {
  V: 5,
  IV: 4,
  III: 3,
  II: 2,
  I: 1,
};

/* extract ranks from api stats object */
const formatRanks = (stats) => stats
  .filter((stat) => playlistMap[stat.label]) // get only valid playlists
  .map((stat) => {
    const playlistName = playlistMap[stat.label];
    const rank = parseInt(stat.value, 10);
    // extract division and tier from ex: "[I] Grand Champion"
    const [, division, tier] = /\[(\w{1,3})\]\s(.*)/.exec(stat.subLabel);
    return {
      [playlistName]: rank,
      [`${playlistName}_division`]: divisionMap[division],
      [`${playlistName}_tier`]: tierMap[tier],
    };
  })
  .reduce((a, c) => ({ ...a, ...c })); // merge all ranks into one object

const createRequest = (apiUrl, apiKey, platform, id) => {
  const query = {
    platform: 3 - platform,
    name: id,
  };


  // 3 - platform = p => -platform = p - 3 => platform = -p + 3 = 3 - p
  const headers = { 'X-API-KEY': apiKey };
  return { url: apiUrl, query, headers };
};

const handleResponse = (res) =>
  new Promise((resolve, reject) => {
    res.text()
      .then((data) => {
        if (data === 'Bad Request') return reject({ message: 'InputError' });
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          reject({ data, message: 'UnknownError' });
        }
      })
      .catch((err) => reject({ data: err, message: 'UnknownError' }));
  });

const formatPlayerResponse = (data) => ({
  player: {
    id: data.platformUserId,
    platform: 3 - parseInt(data.platformId, 10),
    name: data.platformUserHandle,
    ...formatRanks(data.stats),
  },
});

export default { createRequest, handleResponse, formatPlayerResponse };
