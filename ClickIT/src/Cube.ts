module ClickIT {
    export class Cube {
        private mCube: any;
        private mText: any;
        private mTextStyle: any;

        constructor(pCube: any, pX: number, pY: number, pText: string) {
            this.mCube = pCube;
            this.mCube.name = 'cube' + pText;
            this.mCube.checkWorldBounds = true;
            this.mCube.events.onOutOfBounds.add(() => this.mOnOutFromBoundries(), this);
            this.mCube.body.velocity.y = 50 + Math.random() * 200;
            //this.mCube.width = 50;
            //this.mCube.height = 50;
            this.mTextStyle = {
                font: "50px Arial",
                //fill: "#ff0044",
                wordWrap: true,
                wordWrapWidth: this.mCube.width,
                wordWrapHeight: this.mCube.height,
                align: "center",
                backgroundColor: "#ffff00"
            };

            this.mText = Globals.game.add.text(pX, pY, pText, this.mTextStyle);
            this.mText.anchor.set(0.5);


        }
        //____________________________
        private mOnOutFromBoundries(): void {
            //  Move the cube to the top of the screen again
            this.mCube.reset(this.mCube.x, 0);

            //  And give it a new random velocity
            this.mCube.body.velocity.y = 50 + Math.random() * 200;

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