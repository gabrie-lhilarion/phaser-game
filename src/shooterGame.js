import { Scene } from "phaser";
import beam from './assets/beam.png';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png'; 

class ShooterGame extends Scene {
    preload() {
        this.load.image('ground', beam);
        this.load.image('bomb', bomb);
        // this.load.spritesheet('dude', 
        //                       dude,
        //                       { frameWith: 32, frameHeight: 48 }
        //                     );
    }

    create() {
        this.createPlayArea();
    }

    createPlayArea() {
        this.platForms = this.physics.add.staticGroup();
        this.platForms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platForms.create(400, 400, 'ground');
        this.platForms.create(50, 250, 'ground');
        this.platForms.create(750, 220, 'ground');
    }

    createPlayer() {
        const player = this.physics.add.sprite(100, 450, 'dude')
    }
}

export default ShooterGame;

