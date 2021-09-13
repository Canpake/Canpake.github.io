import Phaser from '../../lib/phaser.js'
import Bullets from "./bullets.js";

export default class gameScene extends Phaser.Scene {

    PLAYER_MOVESPEED = 150;

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;

    /** @type {Bullets} */
    playerBullets;

    /** @type {Phaser.GameObjects.TileSprite}*/
    background;

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursorKeys;

    constructor() {
        super('mainScene');
    }

    preload() {
        // This method is called once at the beginning
        // It will load all the assets, like sprites and sounds
        this.load.image('sky', 'assets/graphics/sky.png');
        this.load.image('ground', 'assets/graphics/platform.png');
        this.load.image('star', 'assets/graphics/star.png');
        this.load.image('bomb', 'assets/graphics/bomb.png');
        this.load.image('bullet', 'assets/graphics/bullet1.png');
        this.load.image('floor', 'assets/graphics/floor.png');

        this.load.image('enemy', 'assets/graphics/enemy1.png');
        this.load.image('player', 'assets/graphics/player.png');

        this.load.spritesheet('dude',
            'assets/graphics/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        // This method is called once, just after preload()
        // It will initialize our scene, like the positions of the sprites
        this.platforms = this.physics.add.staticGroup();
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.background = this.add.tileSprite(400, 300, 800, 600, 'floor');

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(this.scale.width*0.5, 550, 'player');
        this.player.setCollideWorldBounds(true);
        this.playerBullets = new Bullets(this);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.playerBullets, this.platforms, this.bulletHitPlatform);

        // camera - set the horizontal dead zone to 1.5x game width
        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.setDeadzone(this.scale.width * 0.8);
    }

    update(time, delta) {
        // This method is called 60 times per second after create()
        // It will handle all the game's logic, like movements
        this.updatePlayerMovement();
        this.updatePlayerShooting();
        this.updateBackground();
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

    bulletHitPlatform(bullet, platform) {
        if (bullet) { bullet.destroy(); }
        if (platform) { platform.destroy(); }
    }

    updateBackground() {
        this.background.tilePositionY -= 1;
        this.background.tilePositionY %= this.background.height;
    }
}