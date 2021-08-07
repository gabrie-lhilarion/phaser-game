const Styles = (() => {

    const leaderboard =  {
        backgroundColor: 'white', 
        color: 'black',
        width: '150px', 
        padding: '6px', 
        font: '15px Arial',
        borderRadius: '6px',
        textAlign: 'center',
        cursor: 'pointer',
    }

    const backButton = {
        backgroundColor: 'yellow',
        display: 'inline-block',
        padding: '5px'
    }

    const startButton = {
        backgroundColor: 'white', 
        color: 'black',
        width: '200px', 
        padding: '10px', 
        font: '24px Arial',
        borderRadius: '6px',
        textAlign: 'center',
        cursor: 'pointer'
    }

    const leaderboardButton = {
        backgroundColor: 'white', 
        color: 'black',
        width: '350px', 
        padding: '10px', 
        font: '24px Arial',
        borderRadius: '6px',
        textAlign: 'center',
        cursor: 'pointer'
    }

    return { leaderboard, backButton, startButton, leaderboardButton }

})();

export default Styles;