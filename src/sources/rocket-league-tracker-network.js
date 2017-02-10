const playlistMap = {
  'Ranked Duel 1v1': '1v1',
  'Ranked Doubles 2v2': '2v2',
  'Ranked Solo Standard 3v3': '3v3s',
  'Ranked Standard 3v3': '3v3',
};

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
};

const divisionMap = {
  V: 5,
  IV: 4,
  III: 3,
  II: 2,
  I: 1,
};

/* extract ranks from api stats object */
const getRanksFromInformation = (stats) => {
  const ranks = {};
  stats.forEach((stat) => {
    const playlist = playlistMap[stat.label];

    if (playlist) {
      ranks[playlist] = parseInt(stat.value, 10) + 1;
      // extract division and rank
      const regex = /\[(\w{1,3})\]\s(.*)/;
      const matched = regex.exec(stat.subLabel);
      ranks[`${playlist}_division`] = parseInt(divisionMap[matched[1]], 10);
      ranks[`${playlist}_tier`] = parseInt(rankMap[matched[2]], 10);
    }
  });
  return ranks;
};

const createRequest = (apiUrl, apiKey, platform, id) => {
  const query = {
    platform: 3 - platform,
    name: id,
  };
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
          resolve(formatResponse(jsonData));
        } catch (e) {
          reject({ data, message: 'UnknownError' });
        }
      })
      .catch((err) => reject({ data: err, message: 'UnknownError' }));
  });

export const formatResponse = (data) => {
  const info = getRanksFromInformation(data.stats);
  info.name = data.platformUserHandle;
  info.id = data.platformUserId;
  return info;
};

export default { createRequest, handleResponse };
