import Phaser from '../../lib/phaser.js'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    /** Additional options (constants for all bullets, not set during fire) */
    this.scaleSpeed = 0;    // speed at which the bullet scales in size
    this.trackDirection = false;  // whether to change rotation based on movement;
  }

  setScaleSpeed(scaleSpeed) {
    this.scaleSpeed = scaleSpeed;
  }

  setTrackDirection(isTracking) {
    this.trackDirection = isTracking;
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
      this.hide();
    }
  }

  update(args) {
    if (this.scaleSpeed > 0) {
      this.setScale(this.scale + this.scaleSpeed);
    }
    if (this.trackDirection) {
      this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x) - Math.PI/2);
    }
  }

  isOutOfBounds() {
    return (this.y <= -100);    // can set positive for visual confirmation of removal
  }

  hide() {
    this.setActive(false);
    this.setVisible(false);
    this.setPosition(0, 0);
  }
}