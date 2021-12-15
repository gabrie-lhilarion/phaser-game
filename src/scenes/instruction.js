import { Scene } from 'phaser';
import IntroImage from '../assets/intro.png';
import Styles from '../utils/styles';

class Instruction extends Scene {
  constructor() {
    super('instruction');
    this.style = Styles;
  }

  preload() {
    this.load.image('introImage', IntroImage);
  }

  create() {
    this.IntroImage = this.add.image(600, 300, 'introImage');
    this.createBackButton();
  }

  createBackButton() {
    const backButton = this.add.dom(100, 30, 'span', this.style.backButton, '<< BACK');
    backButton.setOrigin(0.5);
    backButton.setInteractive({ enabled: true, hitArea: { x: 220, y: 50 } });

    this.backButton = backButton;
    backButton.on('pointerdown', () => { this.scene.start('welcome'); });
  }
}

export default Instruction;
