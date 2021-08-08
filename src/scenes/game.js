import { Scene } from "phaser";
import { Bullets } from "../utils/bullet";
import beam from '../assets/beam.png';
import bomb from '../assets/bomb.png';
import dude from '../assets/dude.png'; 
import star from '../assets/star.png';
import bullet from '../assets/bullet7.png';
import ship from '../assets/bsquadron3.png';
import Scores from '../utils/scores'
import API from '../utils/scoresApi';

class Game extends Scene {

    constructor() {
        super('game');

        this.bullets;

        this.ship;

        this.score = new Scores(0);

        this.gameOver = false;
    }

    init(data) {
        this.name = data.name;
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
        this.createBattleField();
        this.createPlayer();
        this.movePlayerWithArrors();
        this.createStars();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        this.gameOverText = this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#fff' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;


        this.bullets = new Bullets(this);

        this.ship = this.add.image(100, 50, 'ship');
       

        setInterval( () => {
            this.bullets.fireBullet(this.ship.x, this.ship.y);
        }, 10000);

        this.bombPlayer();
    }

    createBattleField() {
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

        this.score.set(10);
        this.scoreText.setText('Score: ' + this.score.get());

        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
        }

    }

    bombPlayer() {
        this.physics.add.collider(this.player, this.bullets,  this.explode, null, this);       
    }

    explode(player, bullets) {
        this.gameOverText.visible = true;
        this.player.setTint(0xff0000);
        this.player.anims.play('right');
        this.physics.pause();

        const { setScore} = API;
        this.score.get() > 0 ? setScore({ "user": this.name, "score": this.score.get() }) :
         setScore({ "user": this.name, "score": "0" });

        this.score.reset();
        
        setTimeout( () => {this.scene.start('welcome')}, 3000);
    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            this.ship.x = this.player.x;

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true); 
            this.ship.x = this.player.x;

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn'); 
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330); 
        }
    }
}

export default Game;

