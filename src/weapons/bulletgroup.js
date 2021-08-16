import Phaser from 'phaser';
import Bullet from './bulletsprite';

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 500,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}

export default Bullets;
