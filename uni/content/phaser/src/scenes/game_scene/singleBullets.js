import Phaser from '../../lib/phaser.js'
import Bullet from "./bullet.js";

export default class SingleBullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      key: 'bullet1',
      frameQuantity: 20,
      active: false,
      visible: false,
      classType: Bullet
    });

    this.nextFire = 0;        // time until next fire
    this.bulletSpeed = 600;
    this.fireRate = 100;
    this.weaponName = "Single Fire";
  }

  fireBullet(x, y) {
    if (this.scene.game.getTime() < this.nextFire) {
      return;
    }

    let bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y-30, -90, this.bulletSpeed, 0, 0);
      this.nextFire = this.scene.game.getTime() + this.fireRate;
    }
  }
}