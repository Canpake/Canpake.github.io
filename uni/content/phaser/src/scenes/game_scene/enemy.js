import Phaser from '../../lib/phaser.js'

/**
 * A generic enemy class (more like interface) that can make itself visible and do things.
 * Meant to be implemented by other classes, representing specific types of enemies.
 */
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    if (new.target === Enemy) {
      throw new TypeError("Constructing an Enemy directly is not allowed; use a specific enemy implementation like FallingEnemy");
    }
    super(scene, x, y, key);

    this.isOutOfBounds = function() {
      return (this.y < -100
           || this.y > scene.scale.height + 100
           || this.x < -100
           || this.x > scene.scale.width + 100
      )
    }

    /** Additional options (constants for all enemies of a type, not set during spawn) */
    this.trackDirection = false;
  }

  setTrackDirection(isTracking) {
    this.trackDirection = isTracking;
  }

  spawn(x, y, angle, speed, dx=0, dy=0) {
    this.setPosition(x, y);

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
    if (this.trackDirection) {
      this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x) - Math.PI/2);
    }
  }

  hide() {
    this.setActive(false);
    this.setVisible(false);
    this.setPosition(0, 0);
  }
}