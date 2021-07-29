class SaveScore {

    async newGame(data) {
            const myData = JSON.stringify({name: data});
            try {
                const postIt = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/game/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    mode: 'cors',
                    data: myData,
                });

                const responseData = await postIt.data();
                if(!responseData .ok) {
                    console.log(responseData);
                    return responseData;
                }
                return responseData.status;
            } catch(error) {
                console.log(error);
                return error;
            }
        
    }

    async postScore(myData) {
        try {
            const postIt = await fetch('', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    },
                mode: 'cors',
                data: myData,
            });

            const responseData = await postIt.data();
            if(!responseData.ok) {
                console.log(responseData);
                return;
            }
            return responseData.status;
        } catch(error) {
            console.log(error);
        }
        
    }


}

export default SaveScore;