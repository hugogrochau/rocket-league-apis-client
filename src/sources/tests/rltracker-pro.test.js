import RLTrackerPro, { formatResponse } from '../rltracker-pro';
import mockResponse from './mocks/rltracker-pro-response.mock.json';
import formattedInformation from './mocks/rltracker-pro-formatted-information.mock.json';

describe('rltracker.pro', () => {
  const apiKey = 'API_KEY';
  const apiUrl = 'http://test.com';

  describe('createRequest', () => {
    const id = 1;
    const platform = 0;
    const expected = {
      url: apiUrl,
      query: {
        api_key: apiKey,
        id,
        platform: platform + 1,
      },
    };
    it('Should create a correct request', () =>
      expect(RLTrackerPro.createRequest(apiUrl, apiKey, platform, id)).to.deep.equal(expected)
    );
  });

  describe('formatResponse', () => {
    it('Should properly format the response', () =>
      expect(formatResponse(mockResponse)).to.deep.equal(formattedInformation)
    );
  });
});
