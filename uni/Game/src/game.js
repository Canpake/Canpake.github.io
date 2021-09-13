import {default_configs} from "./default_configs.js";
import gameScene from "./scenes/game_scene/game_scene.js";
import Phaser from './lib/phaser.js'

const config = {
    scene: gameScene,
    parent: 'phasergame',
    ...default_configs
};

const game = new Phaser.Game(config);