import Enemy from "./enemy.js";

/**
 * A class for enemies that fall from top to bottom.
 * Meant to be called by group objects that will take of creating instances with appropriate params.
 */
export default class FallingEnemy extends Enemy {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    /** Additional options (constants for all enemies of a type, not set during spawn) */
    this.fallSpeed = 100;
    this.fallSpeedChange = 0;
    this.fallDirection = 90;
  }

  setFallSpeed(fallSpeed) {
    this.fallSpeed = fallSpeed;
  }

  setFallSpeedChange(fallSpeedChange) {
    this.fallSpeedChange = fallSpeedChange;
  }

  spawn(x, y) {
    super.spawn(x, y, this.fallDirection, this.fallSpeed, 0, this.fallSpeedChange)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  update(args) {
    super.update(args);
  }
}