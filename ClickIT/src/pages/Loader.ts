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
            this.load.image('background', 'www/img/menu.png');
        }
        //______________________________
        public create(): void {
           
            //  Now start the Game state.
            this.game.state.start("Menu");
        }
        //______________________________
    }
}