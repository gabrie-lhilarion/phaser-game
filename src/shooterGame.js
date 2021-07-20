import { Scene } from "phaser";
import { Bullet, Bullets } from "./bullet";
import beam from './assets/beam.png';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png'; 
import star from './assets/star.png';
import bullet from './assets/bullet7.png';
import ship from './assets/bsquadron3.png';

class ShooterGame extends Scene {

    constructor() {
        super()
        this.score = 0;

        this.playerLocation;

        this.bullets;
        this.ship;
    }

    preload() {
        this.load.image('ground', beam);
        this.load.image('bomb', bomb);
        this.load.image('star', star);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 } );
        this.load.image('bullet', bullet);
        this.load.image('ship', ship);
    }

    create() {
        this.createPlayArea();
        this.createPlayer();
        this.movePlayerWithArrors();
        this.createStars();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        
        this.playerLocationInfo = this.add.text(
            16, 
            48, 
            `Location of player: ${this.player.x} : ${this.player.x}`, 
            { fontSize: '32px', fill: '#fff' }
        );
    
    
        this.bullets = new Bullets(this);

        this.ship = this.add.image(400, 500, 'ship');
        
        this.input.on('pointermove', (pointer) => {
            this.ship.x = pointer.x; 
        });

        this.input.on('pointerdown', (pointer) => {

            this.bullets.fireBullet(this.ship.x, this.ship.y);
        });
    }

    createPlayArea() {
        this.platForms = this.physics.add.staticGroup();
        this.platForms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platForms.create(400, 400, 'ground');
        this.platForms.create(50, 250, 'ground');
        this.platForms.create(750, 220, 'ground');
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platForms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    movePlayerWithArrors() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createStars() {
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.stars.children.iterate( (child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platForms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    showPlayerLocation() {
        this.playerLocationInfo.setText(`Location of player: ${parseInt(this.player.x)} : ${parseInt(this.player.y)}`); 
    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            this.showPlayerLocation();
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            this.showPlayerLocation();
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
            this.showPlayerLocation();
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.showPlayerLocation();
        }
    }
}

export default ShooterGame;

