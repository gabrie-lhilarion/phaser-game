import Game from '../scenes/game';
import Leaderboard from '../scenes/leaderboard';
import Welcome from '../scenes/welcome';
import Instruction from '../scenes/instruction';

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
    scene: [Welcome, Leaderboard, Game, Instruction]
};

export { config }