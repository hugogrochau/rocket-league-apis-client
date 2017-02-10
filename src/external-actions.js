import fetch from 'isomorphic-fetch';
import queryString from 'querystring';

export const getInformation = (source, apiUrl, apiKey, platform, id) => {
  const request = source.createRequest(apiUrl, apiKey, platform, id);
  const url = `${request.url}?${queryString.stringify(request.query)}`;
  const options = {};
  if (request.headers) options.headers = request.headers;
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (res.status >= 400) {
          return reject({ response: res, message: res.statusText });
        }
        try {
          resolve(res.json());
        } catch (err) {
          reject({ response: res, message: res.statusText });
        }
      })
      .then((jsonData) => source.formatResponse(jsonData)).catch((err) => { reject({ err, message: 'Unknown Error' }); });
  });
};
