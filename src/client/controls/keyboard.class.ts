import {Player} from '../actors/player/player.class';
import {Controls} from './keyboard.model';

export class KeyBoardControl {
    // will delegate any keyboard input to this class
    public gameControls: Controls;

    // keyboard class will have two dependencies
    // the game world and the player instance
    constructor(private gameInstance: any, private playerInstance: Player) {
        this.gameControls = {
            cursors: this.gameInstance.input.keyboard.createCursorKeys(),
            fireWeapon: this.gameInstance.input.keyboard.addKey(
                Phaser.KeyCode.SPACEBAR
            )
        }   
    }

    public update(): void {
        // logic for when player is alive
        if (this.playerInstance.player.alive) {
            // update player state if a shot is fired
            this.playerInstance.playerState.set('fire', false);
            
            const vel = this.playerInstance.angularVelocity;
            // if player is moving then ...
            if (this.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(
                    this.playerInstance.player.rotation,
                    100,
                    this.playerInstance.player.body.acceleration
                );

                // update state to indicate that the player is moving
                this.playerInstance.player.animation.play('accelerating');
                this.playerInstance.playerState.set('moving', true);
            } else {
                this.playerInstance.player.body.acceleration.set(0);
                this.playerInstance.playerState.set('moving', false);
            }

            // logic for player turning
            if (this.gameControls.cursors.left.isDown) {
                this.playerInstance.player.body.angularVelocity = -vel;
            } else if (this.gameControls.cursors.right.isDown) {
                this.playerInstance.player.body.angularVelocity = vel;
            } else {
                this.playerInstance.player.body.angularVelocity = 0;
            }
        }
    }
}