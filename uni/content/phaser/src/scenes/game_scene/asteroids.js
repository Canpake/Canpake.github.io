import Phaser from "../../lib/phaser.js";
import FallingEnemy from "./fallingEnemy.js";
import {randomInt} from "../../lib/random.js";

export default class Asteroids extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      key: 'bomb',
      frameQuantity: 20,
      active: false,
      visible: false,
      classType: FallingEnemy
    });

    this.xSpawnMin = 100;
    this.xSpawnMax = scene.scale.width - 100;

    this.waveCount = 1;
    this.waveSize = 5;
    this.spawnEnemyDelay = 100;

    /* Configuration */
    function configureEnemy(enemy) {
      enemy.setFallSpeed(randomInt(200, 300));
      // enemy.setFallSpeedChange(randomInt(100, 200));
      enemy.setScale(3);
    }

    this.children.each(configureEnemy);
    this.runChildUpdate = true;
  }

  async spawnWaves(repeat, waveDelay) {
    for (let i = 0; i !== repeat; i++) {
      await this.#spawnWave();
      await this.#sleep(waveDelay)
    }
  }

  async #spawnWave() {
    for (let i = 0; i < this.waveSize; i++) {
      let asteroid = this.getFirstDead(false);

      if (asteroid) {
        asteroid.spawn(randomInt(this.xSpawnMin, this.xSpawnMax), -50);
      }

      await this.#sleep(this.spawnEnemyDelay);
    }
  }

  #sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


}