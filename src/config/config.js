import ShooterGame from '../scenes/game';
import Intro from '../scenes/boot';
import Leaderboard from '../scenes/leaderboard';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
    scene: [ Leaderboard,Intro,ShooterGame]
};

export { config }