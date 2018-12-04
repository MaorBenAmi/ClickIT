module ClickIT {
    export class EndGame extends Phaser.State{
        private mText;
        private mTextStyle = {
            font: "50px Arial",
            wordWrap: true,
            wordWrapWidth: 100,
            wordWrapHeight: 100,
            align: "center"
        };
        constructor() {
            super();
            
        }
        //______________________________
        public create(): void {
            this.mText = Globals.gameManager.gameBoard.add.text(100, 100, "END", this.mTextStyle);
            this.mText.anchor.set(0.5);

            let aTryAgain = Globals.gameManager.gameBoard.add.text(300, 300, "Try Again", this.mTextStyle);
            aTryAgain.anchor.set(0.5);

            aTryAgain.inputEnabled = true;
            aTryAgain.events.onInputDown.add(() => this.start(), this);

        }
        //______________________________
        public start(): void {
            this.game.state.start("Game");
        }
        //______________________________
    }
}