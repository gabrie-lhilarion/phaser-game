
const API = (() => {
    const key = 'IVvnZUrFMmJmZITRlPnz';
  
    const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;
    const getScore = () => new Promise((resolve, reject) => {
      fetch(urlRequest)
        .then(response => response.json()
          .then((json) => {
            resolve(json.result);
          })).catch((e) => {
          reject(e);
        });
    });
  
    const setScore = (data) => fetch(urlRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(result => result.json());
  
  
    return { getScore, setScore };
  })();
  
  export default API;