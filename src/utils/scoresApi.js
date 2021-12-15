const API = (() => {
  const key = 'zF5lTqLs7MJqSC86X9PM';
  const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

  const setScore = (data) => fetch(urlRequest, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((result) => result.json());

  const getScore = () => new Promise((resolve, reject) => {
    fetch(urlRequest)
      .then((response) => response.json()
        .then((json) => {
          resolve(json.result);
        })).catch((e) => {
        reject(e);
      });
  });

  const displayScore = () => API.getScore();

  return { setScore, getScore, displayScore };
})();

export default API;
