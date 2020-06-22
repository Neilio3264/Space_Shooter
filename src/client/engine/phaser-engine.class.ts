import { Game } from "../game/game.class";
import { LifeCycle } from "./lifecycle";
import { Game as PhaserGame } from "phaser-ce";

export class PhaserSpaceGame extends Game implements LifeCycle {
    // The PhaserSpaceGame class will have one attribute,
    // which is the game itself created by Phaser to power our complete
    // game with Phaser.
    private game: Phaser.Game;

    constructor() {
        // the game object in our class and passing in 4 arguments
        // width = 1024, height = 786,
        // Phaser.AUTO will auto detect what the browser is capable of (usually
        // it's Phaser.CANVAS)
        // And lastly we pass in the same of our game, which is space-shooter
        super();
        this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-shooter', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    
    public preload(): void {
        // no need to set credentials for our requests are happening on localhost
        this.game.load.crossOrigin = 'anonymous';

        // set the game's background to space
        this.game.load.image('space', 'assets/background.jpg');

        // if any shot is fired with the image laser, register the bullet graphic
        this.game.load.image('laser', 'assets/bullet.png');

        // load the dust image
        this.game.load.spritesheet('dust', 'assets/dust.png', 64, 64, 16);

        // load the explosion image
        this.game.load.spritesheet('kaboom', 'assets/explostions.png', 64, 64, 16);

        // load the power-up graphic
        this.game.load.image('pickup', 'assets/pickup.png');

        // load the ship graphic
        this.game.load.spritesheet('shooter-sprite', 'assets/ship.png', 32, 32);
    }

    public create(): void {
        super.properties(this.game);
        super.manageAssets(this.game);
    }

    public update(): void {
        super.gameUpdate(this.game);
    }
}