import { Scene } from "phaser";
import API from '../utils/scoresApi'
import "regenerator-runtime/runtime";

class leaderboard extends Scene {
    constructor() {
        super('Leaderboard')
    }

    preload() {

    }

    create() {
      const startGameDivStyle =  
      ` background-color: white; 
        color: black;
        width: 150px; 
        padding: 6px; 
        font: 15px Arial;
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
      `;

      this.add.dom(400, 30, 'span', startGameDivStyle , `LEARDERBOARD`);

      API.displayScore()
      .then( (results) => { 
        let x = 60;
        results.forEach(item => {
          let scoreText = `${item.user}: ${item.score}`;
          this.add.dom(400, x, 'span', startGameDivStyle , `${scoreText}`);
          x += 30;
        });

      })
      .catch(error => {  this.add.dom(400, 60, 'span', startGameDivStyle ,  `${error}`); } );

    }
}

export default leaderboard;