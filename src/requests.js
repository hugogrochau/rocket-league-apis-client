import fetch from 'isomorphic-fetch';
import queryString from 'querystring';

export const getPlayerInformation = (tracker, apiUrl, apiKey, platform, id) => {
  const request = tracker.createRequest(apiUrl, apiKey, platform, id);
  const url = `${request.url}?${queryString.stringify(request.query)}`;
  const options = {};
  if (request.headers) options.headers = request.headers;
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        tracker.handleResponse(res)
          .then((formattedRes) => {
            resolve(tracker.formatPlayerResponse(formattedRes));
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject({ data: err, message: 'ServerError' }));
  });
};
