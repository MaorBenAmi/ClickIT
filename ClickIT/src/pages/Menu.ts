/// <reference path="../../ts_maps/phaser.d.ts" />
/// <reference path="game.ts" />
module ClickIT {
    export class Menu extends Phaser.State {
        private mMenu: any;
        private mMenuStartX: number = 260;
        private mMenuStarty: number = 30;
        private mMenuText: any;
        private mMenuTextStyle: any;
        private mBackGround: any;
        private mContainer: HTMLDivElement;
        private mStartText: string = "Start";
        constructor() {
            super();
            this.mContainer = document.getElementById('content') as HTMLDivElement;
            this.mMenu = this.mStartText;
            this.mMenuTextStyle = {
                font: "50px Arial",
                wordWrap: true,
                //wordWrapWidth: this.mCube.width,
                //wordWrapHeight: this.mCube.height,
                align: "center"
            
            };
           
        };
        //______________________________
        public preload(): void {
            
        }
        //______________________________
        public create(): void {

            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            this.mBackGround = Globals.gameManager.gameBoard.add.tileSprite(this.mMenuStartX, this.mMenuStarty, aContainerBoundingRect.width, aContainerBoundingRect.height, 'background')
            this.mMenuText = Globals.gameManager.gameBoard.add.text(this.mMenuStartX, this.mMenuStarty, this.mStartText, this.mMenuTextStyle);
            this.mMenuText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.mMenuText.anchor.set(0.5);
            this.mMenuText.inputEnabled = true;
            this.mMenuText.events.onInputDown.add(() => this.start(), this);
           
            //  Now start the Game state.
            
        }
        //______________________________
        private start(): void {
            this.game.state.start("Game");

        }
    }
}