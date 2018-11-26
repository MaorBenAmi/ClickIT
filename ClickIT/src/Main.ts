module ClickIT {
    export class Main {
        private mGame: Game;
        private mContainer: HTMLDivElement;
        private mGameBoard: Phaser.Game;
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
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            this.mGameBoard = new Phaser.Game(aContainerBoundingRect.width, aContainerBoundingRect.height, Phaser.AUTO, 'content', { preload: () => this.preload(), create: () => this.create() });
        }
        //____________________________
        private preload() {

            //  Add the States your game has.
            this.mGameBoard.state.add("Loader", new Loader());
            this.mGameBoard.state.add("Game", this.mGame);
            this.mGameBoard.state.add("EndGame", new EndGame());

            //  Now start the Loader state.
            this.mGameBoard.state.start("Loader");
        }
        //____________________________
        private create() {
           //Globals.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           //Globals.game.scale.pageAlignHorizontally = true;
           //Globals.game.scale.pageAlignVertically = true;
           //Globals.game.stage.disableVisibilityChange = true;
            // Change background color of canvas
            this.mGameBoard.stage.backgroundColor = 'rgba(68, 136, 170, 1)';
            //Globals.game.input.mouse.capture = true;



            //Globals.game.stage.backgroundColor = '#2d2d2d';
            this.mGameBoard.physics.startSystem(Phaser.Physics.ARCADE);
            this.mGameBoard.physics.setBoundsToWorld();
        }
        //____________________________
        public get gameBoard(): Phaser.Game {
            return this.mGameBoard;
        }
        //____________________________
        public get game(): Game {
            return this.mGame;
        }
        //____________________________
    }
}

window.onload = () => {
    ClickIT.Globals.gameManager = new ClickIT.Main();
}