import Phaser, { Scene } from 'phaser';
import Styles from '../utils/styles';

class Welcome extends Scene {
  constructor() {
    super('welcome');

    this.name = null;
    this.style = Styles;
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    })
    
    this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)

  }

  create() {
 
   
    this.createLeaderboardButton();
    this.createInstructionButton();

    const playerName = this.add.text(400, 300, 'Enter your fullname', 
      {
        fontSize: 30, 
        textAlign: 'center', 
        fixedWidth: 360, 
        fixedHeight: 36, 
        backgroundColor: '#fff',
        color: '#000',
        padding: 5,
        shadow:
        {
          fill: true,
          blur: 0,
          offsetY: 0,
        }, 
      }
    )

    playerName.setOrigin(0.5, 0.5)
  
    playerName.setInteractive().on('pointerdown', () => {
      playerName.setText('')
      this.startGameDiv.setVisible(true)
      this.rexUI.edit(playerName)
    })

    this.createStartButton(playerName);
    
  }



  createStartButton(playerName) {
    const startGameDiv = this.add.dom(400, 350, 'div', this.style.startButton, 'START GAME');
    startGameDiv.setOrigin(0.5);
    startGameDiv.setInteractive({ enabled: true, hitArea: { x: 220, y: 50 } });

    this.startGameDiv = startGameDiv;
    this.startGameDiv.setVisible(false);

    startGameDiv.on('pointerdown', () => {
        
      if ( playerName.text.trim() !== 'Enter your fullname' && playerName.text !== '' ) {
        this.scene.start('game', { name: playerName.text }); 
      } else {  this.add.text(250, 240, 'Please enter your fullname', { color: 'red', fontSize: '20px ' }); }
      
       
    });
  }

  createLeaderboardButton() {
    const leaderBoard = this.add.dom(400, 130, 'div', this.style.leaderboardButton, 'VIEW LEADERBOARD');
    leaderBoard.setOrigin(0.5);
    leaderBoard.setInteractive({ enabled: true, hitArea: { x: 220, y: 50 } });

    this.leaderBoard = leaderBoard;

    leaderBoard.on('pointerdown', () => { this.scene.start('Leaderboard'); });
  }

  createInstructionButton() {
    const instructionButton = this.add.dom(400, 180, 'div', this.style.instructionButton, 'SEE HOW TO PLAY');
    instructionButton.setOrigin(0.5);
    instructionButton.setInteractive({ enabled: true, hitArea: { x: 220, y: 50 } });

    this.instructionButton = instructionButton;

    instructionButton.on('pointerdown', () => { this.scene.start('instruction'); });
  }
}

export default Welcome;
