import Phaser from '../../lib/phaser.js'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scaleSpeed = 0;  // speed at which the bullet scales in size
  }

  fire(x, y, angle, speed, gx=0, gy=0) {
    console.log("OK");
    this.setPosition(x, y);
    this.setScale(1);

    this.setActive(true);
    this.setVisible(true);

    this.setAngle(angle);
    this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
    this.body.gravity.set(gx, gy);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.isOutOfBounds()) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  update() {
    if (this.scaleSpeed > 0) {
      this.setScale(this.scale + this.scaleSpeed);
    }
  }

  isOutOfBounds() {
    return (this.y <= 30);    // disable beyond y: 30 for now, to have visual confirmation
  }
}