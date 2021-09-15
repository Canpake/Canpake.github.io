import Phaser from '../../lib/phaser.js'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    /** Additional options (constants for all bullets, not set during fire) */
    this.scaleSpeed = 0;    // speed at which the bullet scales in size
    this.tracking = false;  // whether to change rotation;
  }

  setScaleSpeed(scaleSpeed) {
    this.scaleSpeed = scaleSpeed;
  }

  setTracking(isTracking) {
    this.tracking = isTracking;
  }

  fire(x, y, angle, speed, dx=0, dy=0) {
    this.setPosition(x, y);
    this.setScale(1);

    this.setActive(true);
    this.setVisible(true);

    this.setAngle(angle+90);
    this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
    this.body.setGravity(dx, dy);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.isOutOfBounds()) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  update(args) {
    if (this.scaleSpeed > 0) {
      this.setScale(this.scale + this.scaleSpeed);
    }
    if (this.tracking) {
      this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x) - Math.PI/2);
    }
  }

  isOutOfBounds() {
    return (this.y <= -100);    // disable beyond y: -30; set positive for visual confirmation of removal
  }
}