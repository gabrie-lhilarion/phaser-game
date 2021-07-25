import { Scene } from 'phaser';
import IntroImage from './assets/intro.jpg'; 

class Intro extends Scene {
    
    constructor() {
        super('intro')
    }

    preload ()
    {
        this.load.image('introImage', IntroImage);
    }
      
    create ()
    {
        const startGameDivStyle =  `background-color: white; 
                                    color: black;
                                    width: 150px; 
                                    padding: 10px; 
                                    font: 24px Arial;
                                    border-radius: 6px;
                                    text-align: center;
                                    cursor: pointer;
                                    `;
                                    
        const startGameDiv = this.add.dom(200, 200, 'div', startGameDivStyle , 'START');
              startGameDiv.setOrigin(.5);
              startGameDiv.setInteractive({enabled: true, hitArea:{x: 220, y: 50}});

        this.IntroImage = this.add.image(600, 300, 'introImage');
      
        this.tweens.add({
            targets: startGameDiv,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });

        startGameDiv.on('pointerdown', () => { this.scene.start('shooter') });
    }
}

export default Intro;