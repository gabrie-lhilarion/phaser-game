import Api from '../utils/scoresApi';

beforeEach(() => {
  fetch.resetMocks();
});

test('returns result if array', () => {
  fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
});

it('Return score', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        user: 'John Doe',
        score: 42,
      }],
  }));
  const res = await Api.getScore();
  expect(res).toEqual([{ score: 42, user: 'John Doe' }]);
  expect(fetch.mock.calls.length).toEqual(1);
});

test('Return value for POST action', () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return Api.setScore()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Leaderboard score created correctly.' });
    });
});

test('returns result if non-empty object for POST action', () => {
  fetch.mockResponseOnce(JSON.stringify({ result: 'Leaderboard score created correctly.' }));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return Api.setScore()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({ result: 'Leaderboard score created correctly.' });
    });
});
