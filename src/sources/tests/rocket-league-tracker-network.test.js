import RocketLeagueTrackerNetwork from '../rocket-league-tracker-network';
import mockResponse from './mocks/rocket-league-tracker-network-response.mock.json';
import formattedInformation from './mocks/rocket-league-tracker-network-formatted-information.mock.json';

describe('Rocket League Tracker Network', () => {
  const apiUrl = 'http://test.com';
  const apiKey = 'API_KEY';

  describe('createRequest', () => {
    const name = 1;
    const platform = 0;
    const expected = {
      url: apiUrl,
      query: {
        name,
        platform: 3 - platform,
      },
      headers: [{ 'X-API-KEY': apiKey }],
    };
    it('Should create a correct request', () =>
      expect(RocketLeagueTrackerNetwork.createRequest(apiUrl, apiKey, 0, 1)).to.deep.equal(expected)
    );
  });

  describe('formatResponse', () => {
    it('Should properly format the response', () =>
      expect(RocketLeagueTrackerNetwork.formatResponse(mockResponse)).to.deep.equal(formattedInformation)
    );
  });
});
