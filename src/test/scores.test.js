import Scores from '../utils/scores';

let gameScore;

beforeAll(() => {
  gameScore = new Scores(0);
});

it('has an initial value of 0', () => {
  expect(gameScore.get()).toBe(0);
});

it('adds to the score', () => {
  gameScore.set(20);
  expect(gameScore.get()).toBe(20);
});

it('resets the score to 0', () => {
  gameScore.reset();
  expect(gameScore.get()).toBe(0);
});
