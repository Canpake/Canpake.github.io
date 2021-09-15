import Phaser from '../../lib/phaser.js'
import Bullet from "./bullet.js";

export default class RippleBullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      key: 'bullet4',
      frameQuantity: 20,
      active: false,
      visible: false,
      classType: Bullet
    });

    this.nextFire = 0;        // time until next fire
    this.bulletSpeed = 350;
    this.fireRate = 300;
    this.scaleSpeed = 0.02;
    this.weaponName = "Scaling";

    /* Configuration */
    function configureBullet(bullet) {
      bullet.setScaleSpeed(0.02)
    }

    this.children.each(configureBullet);
    this.runChildUpdate = true;
  }

  fireBullet(x, y) {
    if (this.scene.game.getTime() < this.nextFire) {
      return;
    }

    let bullet = this.getFirstNth(1, false, false)

    if (bullet) {
      bullet.fire(x, y-30, -90, this.bulletSpeed, 0, 0);
      this.nextFire = this.scene.game.getTime() + this.fireRate;
    }
  }
}