/// <reference path="../../ts_maps/phaser.d.ts" />
/// <reference path="game.ts" />
module ClickIT {
    export class Menu extends Phaser.State {
        private mMenu: any;
        private mMenuStartX: number = 0;
        private mMenuStarty: number = 0;
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
                align: "center"
            };
           
        };
        //______________________________
        public preload(): void {
            
        }
        //______________________________
        public create(): void {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();

            this.mMenuText = Globals.gameManager.gameBoard.add.text(aContainerBoundingRect.width / 2, aContainerBoundingRect.height / 2, this.mStartText, this.mMenuTextStyle);
            this.mMenuText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.mMenuText.anchor.set(0.5);
            this.mMenuText.inputEnabled = true;
            this.mMenuText.events.onInputDown.add(() => this.start(), this);


            //this.mBackGround = Globals.gameManager.gameBoard.add.sprite(this.mMenuStartX, this.mMenuStarty, 'background')



 
            ////  Now start the Game state.
            
        }
        //______________________________
        private start(): void {
            this.game.state.start("Game");

        }
    }
}