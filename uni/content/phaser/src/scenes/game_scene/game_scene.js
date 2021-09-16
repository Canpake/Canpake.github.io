import Phaser from '../../lib/phaser.js'
import SingleBullets from "./singleBullets.js";
import SpreadBullets from "./spreadBullets.js";
import RippleBullets from "./rippleBullets.js";
import Asteroids from "./asteroids.js";

export default class gameScene extends Phaser.Scene {

    PLAYER_MOVESPEED = 250;

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;

    /** @type {SingleBullets} */
    playerBullets;

    playerBulletsIndex;
    playerBulletsArray;

    /** @type {Phaser.GameObjects.Text} */
    playerBulletsText;

    /** @type {Phaser.GameObjects.TileSprite}*/
    background;

    /** @type {Asteroids} */
    asteroids;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursorKeys;

    constructor() {
        super('mainScene');
    }

    preload() {
        this.load.image('sky', 'assets/graphics/sky.png');
        this.load.image('ground', 'assets/graphics/platform.png');
        this.load.image('star', 'assets/graphics/star.png');
        this.load.image('bomb', 'assets/graphics/bomb.png');
        this.load.image('bullet1', 'assets/graphics/bullet1.png');
        this.load.image('bullet2', 'assets/graphics/bullet2.png');
        this.load.image('bullet3', 'assets/graphics/bullet3.png');
        this.load.image('bullet4', 'assets/graphics/bullet4.png');
        this.load.image('floor', 'assets/graphics/floor.png');

        this.load.image('enemy', 'assets/graphics/enemy1.png');
        this.load.spritesheet('player', 'assets/graphics/player.png',
          {frameWidth: 20, frameHeight: 30});
    }

    create() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.background = this.add.tileSprite(400, 300, 800, 600, 'floor');

        this.player = this.physics.add.sprite(this.scale.width*0.5, 550, 'player');
        this.player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.player.setScale(2);
        this.player.setCollideWorldBounds(true);

        this.asteroids = new Asteroids(this);

        this.playerBulletsArray = [];
        this.playerBulletsArray.push(new SingleBullets(this));
        this.playerBulletsArray.push(new SpreadBullets(this));
        this.playerBulletsArray.push(new RippleBullets(this));

        this.playerBulletsIndex = 0;
        this.playerBullets = this.playerBulletsArray[this.playerBulletsIndex];

        this.physics.add.collider(this.player, this.asteroids);
        this.playerBulletsArray.forEach(bullets => this.physics.add.collider(bullets, this.asteroids, this.bulletHitAsteroid))

        this.input.keyboard.on('keydown-Z', this.nextPlayerWeapon, this);
        this.playerBulletsText = this.add.text(25, 25, this.playerBullets.weaponName, {
            font: "40px", fill: "#000"
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 3, 0 ] }),
            frameRate: 12,
            repeat: -1,
            repeatDelay: 100,
        });
        this.player.play('idle');

        this.asteroids.spawnWaves(-1, 10000);
    }

    update(time, delta) {
        this.updatePlayerMovement();
        this.updatePlayerShooting();
        this.playerBullets.preUpdate();
        this.asteroids.preUpdate();
        this.updateBackground();
        this.updateEnemySpawn();
    }

    updatePlayerMovement() {
        let playerVelocityX = 0;
        let playerVelocityY = 0;

        if (this.cursorKeys.left.isDown)  { playerVelocityX -= this.PLAYER_MOVESPEED; }
        if (this.cursorKeys.right.isDown) { playerVelocityX += this.PLAYER_MOVESPEED; }
        if (this.cursorKeys.up.isDown)    { playerVelocityY -= this.PLAYER_MOVESPEED; }
        if (this.cursorKeys.down.isDown)  { playerVelocityY += this.PLAYER_MOVESPEED; }

        this.player.setVelocityX(playerVelocityX);
        this.player.setVelocityY(playerVelocityY);
    }

    updatePlayerShooting() {
        if (this.cursorKeys.space.isDown) {
            this.playerBullets.fireBullet(this.player.x, this.player.y);
        }
    }

    bulletHitAsteroid(bullet, asteroid) {
        if (bullet) { bullet.hide(); }
        if (asteroid) { asteroid.hide(); }
    }

    nextPlayerWeapon() {
        this.playerBulletsIndex += 1;
        this.playerBulletsIndex %= this.playerBulletsArray.length;
        this.playerBullets = this.playerBulletsArray[this.playerBulletsIndex];
        this.playerBulletsText.setText(this.playerBullets.weaponName);
    }

    updateBackground() {
        this.background.tilePositionY -= 1;
        this.background.tilePositionY %= this.background.height;
    }

    updateEnemySpawn() {
        // empty method for now
    }
}