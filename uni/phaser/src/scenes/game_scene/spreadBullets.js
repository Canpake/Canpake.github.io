import Phaser from '../../lib/phaser.js'
import Bullet from "./bullet.js";

export default class SpreadBullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      key: 'bullet2',
      frameQuantity: 20,
      active: false,
      visible: false,
      classType: Bullet
    });

    this.nextFire = 0;        // time until next fire
    this.bulletSpeed = 400;
    this.fireRate = 200;
    this.weaponName = "Spread";

    /* Configuration */
    function configureBullet(bullet) {
      bullet.setTrackDirection(true);
    }

    this.children.each(configureBullet);
    this.runChildUpdate = true;
  }

  fireBullet(x, y) {
    if (this.scene.game.getTime() < this.nextFire) {
      return;
    }

    let bullet1 = this.getFirstNth(1, false, false)
    let bullet2 = this.getFirstNth(2, false, false)

    if (bullet1 && bullet2) {
      bullet1.fire(x+30, y-30, -90+10, this.bulletSpeed, -300, 0);
      bullet2.fire(x-30, y-30, -90-10, this.bulletSpeed, 300, 0);
      this.nextFire = this.scene.game.getTime() + this.fireRate;
    }
  }
}