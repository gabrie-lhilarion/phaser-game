
const API = (() => {
    const key = 'iLHiRkDYwfN6P6ol4m4c';
    const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

    const setScore = (data) => fetch(urlRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(result => result.json());

   
    const getScore = () => new Promise((resolve, reject) => {
      fetch(urlRequest)
        .then(response => response.json()
          .then((json) => {
            resolve(json.result);
          })).catch((e) => {
          reject(e);
        });
    });

    const displayScore = () => {
      return API.getScore();
    }
    
    return { setScore, getScore, displayScore };
  })();
  
  export default API;