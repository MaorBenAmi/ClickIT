module ClickIT {
    export class Main {
        private mGame: Game;
        private mWidth: number = 0;
        private mHeight: number = 0;
        private mContainer: HTMLDivElement;

        constructor() {
            this.mContainer = document.getElementById('content') as HTMLDivElement;

            this.createGameBoard();
            this.mGame = new Game();
        }
        //_____________________________
        private createGameBoard(): void {
            let gameWidth = 640;
            let gameHeight = 960;
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;
            let ratio = windowHeight / windowWidth;
            if (ratio < 1.5) {
                gameWidth = gameHeight / ratio;
            }
            else {
                gameHeight = gameWidth * ratio;
            }

            this.mWidth = gameWidth;
            this.mHeight = gameHeight;
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            Globals.game = new Phaser.Game(aContainerBoundingRect.width, aContainerBoundingRect.height, Phaser.AUTO, 'content', { preload: () => this.preload(), create: () => this.create() });
        }
        //____________________________
        private preload() {

            //  Add the States your game has.
            Globals.game.state.add("Loader", new Loader());
            Globals.game.state.add("Game", this.mGame);

            //  Now start the Loader state.
            Globals.game .state.start("Loader");
        }
        //____________________________
        private create() {
           //Globals.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           //Globals.game.scale.pageAlignHorizontally = true;
           //Globals.game.scale.pageAlignVertically = true;
           //Globals.game.stage.disableVisibilityChange = true;
            // Change background color of canvas
            Globals.game.stage.backgroundColor = 'rgba(68, 136, 170, 1)';
            //Globals.game.input.mouse.capture = true;



            //Globals.game.stage.backgroundColor = '#2d2d2d';
            Globals.game.physics.startSystem(Phaser.Physics.ARCADE);
            Globals.game.physics.setBoundsToWorld();
        }
        //____________________________
    }
}

window.onload = () => {
    new ClickIT.Main();
}