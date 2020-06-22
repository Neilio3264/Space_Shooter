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
}