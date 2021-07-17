import { Scene } from 'phaser';
import logoImg from './assets/logo.png'; 

class Intro extends Scene {
    
    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const startGameDivStyle =  `background-color: white; 
                                    color: black;
                                    width: 220px; 
                                    padding: 10px; 
                                    font: 24px Arial;
                                    border-radius: 6px;
                                    text-align: center;
                                    cursor: pointer`;
                                    
        const startGameDiv = this.add.dom(200, 200, 'div', startGameDivStyle , 'START GAME')
      
        this.tweens.add({
            targets: startGameDiv,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

export default Intro;