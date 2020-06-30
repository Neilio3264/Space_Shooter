import {Player} from '../actors/player/player.class';

declare const window: any;

export class Game {
    // the game world will serve as our main applicaiton
    // container. It will be the communication layer between
    // server and client

    private actors: Array<any>;
    private actor: Player;

    protected manageAssets(game): void {
        this.actors = [];
        this.actor = new Player(game);
    }

    protected gameUpdate(game): void {
        // will be called 60 fps

        if (this.actor && this.actor.controls) {
            this.actor.view();
        }
    }

    protected properties(game): void {
        // the game will continue running even if you change windows
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(
            0, 0,
            game.width,
            game.height,
            'space'
        );
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;

        // clear before render will allow better performance due to static background
        game.renderer.clearBeforeRender = false;

        // set physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }
}