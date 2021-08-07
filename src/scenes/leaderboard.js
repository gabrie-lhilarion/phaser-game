import { Scene } from "phaser";
import API from '../utils/scoresApi';
import Styles from "../utils/styles";

class leaderboard extends Scene {
    constructor() {
        super('Leaderboard');

        this.style = Styles;
    }

    preload() {

    }

    create() {
      this.createLeaderBoard();
      this.createBackButton();
    }

    createLeaderBoard() {
      this.add.dom(400, 30, 'span', this.style.leaderboard , `LEARDERBOARD`);

      API.displayScore()
      .then( (results) => { 
        let x = 60;

        results.sort((a, b) => {
          return b.score - a.score;
        });

        results.forEach(item => {
          let scoreText = `${item.user}: ${item.score}`;
          this.add.dom(400, x, 'span', this.style.leaderboard, `${scoreText}`);
          x += 30;
        });

      })
      .catch(error => {  this.add.dom(400, 60, 'span', this.style.leaderboard,  `${error}`); } );
    }

    createBackButton() {
      const backButton = this.add.dom(100, 30, 'span', this.style.backButton, `<< BACK`);
      backButton.setOrigin(.5);
      backButton.setInteractive({enabled: true, hitArea:{x: 220, y: 50}});

      this.backButton = backButton;
      backButton.on('pointerdown', () => { this.scene.start('welcome') });
    }
}

export default leaderboard;