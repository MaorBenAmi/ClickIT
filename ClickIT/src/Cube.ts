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
            this.mCube.body.velocity.y = 50 + Globals.score * 300;
            this.mCube.events.onInputDown.add(() => this.onClick(), this);
            this.mTextStyle = {
                font: "50px Arial",
                wordWrap: true,
                wordWrapWidth: this.mCube.width,
                wordWrapHeight: this.mCube.height,
                align: "center"
            };

            this.mText = Globals.game.add.text(pX, pY, pNumber.toString(), this.mTextStyle);
            this.mText.anchor.set(0.5);


        }
        //____________________________
        private onClick(): void {
            if (this.mNumber == Globals.score) {
                Globals.score++;

                setTimeout(() => {
                    this.mCube.reset(this.mCube.x, 0);

                    //  And give it a new random velocity
                    this.mCube.body.velocity.y = 50 + Globals.score * 200;
                    this.mText.text = Globals.score.toString();
                },500);

            } else {
                Globals.game.state.start('EndGame');

            }
        }
        //____________________________
        private onOutFromBoundries(): void {

            setTimeout(() => {
                //  Move the cube to the top of the screen again
                this.mCube.reset(this.mCube.x, 0);

                //  And give it a new random velocity
                this.mCube.body.velocity.y = 50 + Globals.score * 200;

            }, 500);
            
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