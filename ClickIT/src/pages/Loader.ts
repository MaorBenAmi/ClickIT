/// <reference path="../../ts_maps/phaser.d.ts" />
module ClickIT {
    export class Loader extends Phaser.State {
        constructor() {
            super();
        }
        //______________________________
        public preload(): void {
            //load all assets
            this.load.image('cube', 'www/img/cube.png');
        }
        //______________________________
        public create(): void {
            // start physics
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            //  Now start the Game state.
            this.game.state.start("Game");
        }
        //______________________________
    }
}