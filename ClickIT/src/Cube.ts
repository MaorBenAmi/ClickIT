module ClickIT {
    export class Cube {
        private mCube: any;
        private mText: any;
        private mTextStyle: any;
        private mNumber: number;
        constructor(pCube: any, pX: number, pY: number, pNumber: number) {
            this.mNumber = pNumber;
            this.mCube = pCube;
            this.mCube.name = 'cube' + pNumber.toString();;
            this.mCube.inputEnabled = true;
            this.mCube.checkWorldBounds = true;
            this.mCube.events.onOutOfBounds.add(() => this.onOutFromBoundries(), this);
            this.mCube.events.onInputDown.add(() => this.onClick(), this);
            this.mTextStyle = {
                font: "50px Arial",
                wordWrap: true,
                wordWrapWidth: this.mCube.width,
                wordWrapHeight: this.mCube.height,
                align: "center"
            };

            this.mText = Globals.gameManager.gameBoard.add.text(pX, pY, pNumber.toString(), this.mTextStyle);
            this.mText.anchor.set(0.5);


        }
        //____________________________
        private onClick(): void {
            if (this.mNumber == Globals.currentNumber) {
                Globals.currentNumber++;
                //this.mCube.alpha = 0;
                Globals.score += 10;
                Globals.gameManager.gameBoard.add.tween(this.mCube).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                Globals.gameManager.gameBoard.add.tween(this.mText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                setTimeout(() => this.onAfterSuccessClick(), 1000);
            } else {
                Globals.gameManager.gameBoard.state.start('EndGame');
            }
        }
        //____________________________
        private onAfterSuccessClick(): void {
            //fade-out animation
            Globals.gameManager.gameBoard.add.tween(this.mCube).to({ alpha: 1 }, 10, Phaser.Easing.Linear.None, true);
            Globals.gameManager.gameBoard.add.tween(this.mText).to({ alpha: 1 }, 10, Phaser.Easing.Linear.None, true);
            this.mCube.reset(Globals.gameManager.game.getXPosition(), Globals.gameManager.game.getYPosition());
            this.mNumber = Globals.currentNumber;
            this.mText.text = Globals.currentNumber.toString();
        }
        //____________________________
        private reset(): void {
            //  Move the cube to the top of the screen again
            this.mCube.reset(Globals.gameManager.game.getXPosition(), Globals.gameManager.game.getYPosition());
            this.mNumber = Globals.gameManager.game.getRandomNumberText();
            this.mText.text = this.mNumber;
        }
        //____________________________
        private onOutFromBoundries(): void {
            if (this.mNumber == Globals.currentNumber && !Globals.isDebug) {
                Globals.gameManager.gameBoard.state.start('EndGame');
                return;
            }
            setTimeout(() => this.reset(), 500);
            //this.reset();
        }
        //____________________________
        public get text(): any {
            return this.mText;
        }
        //____________________________
        public get cube(): any {
            return this.mCube;
        }
        //____________________________
    }
}