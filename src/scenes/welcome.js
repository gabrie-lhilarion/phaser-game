import Phaser, { Scene } from 'phaser';
import Styles from '../utils/styles';

class Welcome extends Scene {
  constructor() {
    super('welcome');

    this.name = null;
    this.style = Styles;
  }

  preload() {
    this.load.html('form', './form.html');
  }

  create() {
    this.createForm();
    this.createStartButton();
    this.createLeaderboardButton();
    this.createInstructionButton();
  }

  createForm() {
    this.nameInput = this.add.dom(400, 400).createFromCache('form');

    this.message = this.add.text(400, 270, 'Type your full name \nand press Enter button \nto start game', {
      color: '#FFFFFF',
      fontSize: 30,
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('down', () => {
      const name = this.nameInput.getChildByName('name');
      if (name.value !== null) {
        this.message.setText(`Welcome, ${name.value}`);
        this.name = name.value;
        name.value = '';
        this.nameInput.setVisible(false);
        this.startGameDiv.setVisible(true);
      }
    });
  }

  createStartButton() {
    const startGameDiv = this.add.dom(400, 350, 'div', this.style.startButton, 'START GAME');
    startGameDiv.setOrigin(0.5);
    startGameDiv.setInteractive({ enabled: true, hitArea: { x: 220, y: 50 } });

    this.startGameDiv = startGameDiv;
    this.startGameDiv.setVisible(false);

    startGameDiv.on('pointerdown', () => { this.scene.start('game', { name: this.name }); });
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
