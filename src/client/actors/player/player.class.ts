export class Player {
    // create your member variables like we glanced over inside
    // of our domain the player instance which will be a type of
    // Phaser Spirte
    public player: Phaser.Sprite;

    // The player can be controlled with a keyboard
    // KeyBoardControl class still does not exist
    public controls: KeyBoardControl;

    // playerState will keep side effects our player will get during
    // the course of the game. It will nicely embody all of the
    // states in one object
    public playerState: Map<string, boolean | number>;

    // Through Phaser this is used to control the ship's velocity
    // The math behind this not going to be done by us, this
    // is why we decided to go for the usage of Phaser
    public angularVelocity: number = 300;


    constructor(private gameInstance: Phaser.Game,
                public playerInstance: any) {
        // Once we get information from the server we shall
        // create the player with the correct phaser game instance
        this.createPlayer(this.gameInstance);

        // We also save a local copy of the player created by the server
        // so we can reference the correct name and coordinate
        // this.playerInstance = playerInstance;

        // This will serve as a common container for all of our
        // player states (ex: number of bullets fired,
        // is the player moving?, etc)
        this.playerState = new Map();
    }

    public createPlayer(gameInstance): void {
        this.addControls();

        this.player = gameInstance.add.sprite(
            100, 100, 'shooter-sprite'
        );

        this.player.id = "1";

        // set the anchor to center of the sprite
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('accelerating', [1,0], 60, false);

        this.player.name = "Neil";

        this.attachPhysics(gameInstance);
    }

    // If a player picks up a loot, we shall assign it to the
    // player who picked it up
    public assignPickup(game, player?): void {
        this.projectile = new Projectile(game, player.player);
        this.playerState.set('ammo', this.projectile.bulletCount);
    }

    public view(): void {
        this.controls.update();
    }

    private addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance, this);
    }

    private attachPhysics(gameInstance): void {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);

        // If you fly further than the allocated space you will bounce and be forced
        // back in the game world
        this.player.body.collideWorldBounds = true;

        // If anything collides against our player, this is the bounciness setting
        this.player.body.bounce.setTo(10, 10);

        // In space so set our space body to 0 g
        this.player.body.gravity.y = 0;

        // Set drag to bring momentum when flying around the screen
        this.player.body.drag.set(80);

        // max speed
        this.player.body.maxVelocity.set(100);

        // When ships collide, we want to have a reaction
        // We should be moveable inside the framework
        this.player.body.immovable = false;
    }
}