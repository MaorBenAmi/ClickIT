module ClickIT {
    export class Game extends Phaser.State {
        private mSprite1: Phaser.Sprite;
        private mWorldGravity: number = 100;
        private mSpritesGroup: Phaser.Group;
        private mCurrentNumber: number = 0;
        private mNextNumber: number;
        private mCurrentVelocity: number;
        private mSprites: Array<any>;
        private mCubes: Array<Cube>;
        private mContainer: HTMLDivElement;
        private mCurrentNumberText: any;
        private mTotalScore: any;
        private mScoreTextStyle: any;
        constructor() {
            super();
            this.mCubes = new Array<Cube>();
            this.mContainer = document.getElementById('content') as HTMLDivElement;
        }
        //____________________________
        public preload() {
            Globals.currentNumber = 1;
            Globals.score = 0;
        }
        //____________________________
        public create() {
            //this.mSpritesGroup = Globals.gameManager.gameBoard.add.group();
            this.mSpritesGroup = Globals.gameManager.gameBoard.add.physicsGroup(Phaser.Physics.ARCADE);
            this.mSpritesGroup.enableBody = true;
            //this.mSpritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.mSprites = new Array<any>();
           

            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 1; x++) {
                    setTimeout(() => this.addCubeObject(x, y), y * 1500);
                }
            }

            //  Set the world (global) gravity
            Globals.gameManager.gameBoard.physics.arcade.gravity.y = this.mWorldGravity;
            this.addCurrentNumberText();
            this.addTotalScoreText();
        }
        //____________________________
        public getXPosition(): number {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aMaxX: number = aContainerBoundingRect.width - 100;
            let aRandomX: number = Math.floor(Math.random() * aMaxX);
            return aRandomX;
        }
        //____________________________
        public getYPosition(): number {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aMaxY: number = aContainerBoundingRect.height/ 6;
            let aRandomY: number = Math.floor(Math.random() * aMaxY);
            return aRandomY;
        }
        //____________________________
        private addCubeObject(pX: number, pY: number): void {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aMaxX: number = aContainerBoundingRect.width - 50;
            let aXPosition: number = this.getXPosition();
            let aCube = this.mSpritesGroup.create(aXPosition, pY * 50, 'cube');
            let aRandom: number = this.getRandomNumberText();

            if (pY == 3) {
                aRandom = Globals.currentNumber;
            }

            let aCubeObject: Cube = new Cube(aCube, pX, pY, aRandom);
            this.mSprites.push(aCubeObject.cube);
            this.mCubes.push(aCubeObject);
        }
        //____________________________
        public getRandomNumberText(): number {
            let aMin: number = Globals.currentNumber + 4;
            let aMax: number = Globals.currentNumber + 10;

            var num = Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
            return (num === Globals.currentNumber) ? this.getRandomNumberText() : num;
        }
        //____________________________
        public update() {
            this.mSpritesGroup.setAll('body.velocity.y', 200 + Globals.currentNumber * 20);
            Globals.gameManager.gameBoard.physics.arcade.collide(this.mSpritesGroup, this.mSpritesGroup, null, (a, b) => this.onCubesCollides(a, b));
        }
        //____________________________
        private onCubesCollides(a, b): void {
            b.reset(this.getXPosition(), this.getYPosition());
        }
        //____________________________
        public render() {
            for (let i: number = 0; i < this.mCubes.length; i++) {
                let aSpriteCube = this.mCubes[i].cube;
                this.mCubes[i].text.x = Math.floor(aSpriteCube.x + aSpriteCube.width / 2);
                this.mCubes[i].text.y = Math.floor(aSpriteCube.y + aSpriteCube.height / 2);
            }

            this.mCurrentNumberText.text = Globals.currentNumber.toString();
            this.mTotalScore.text = Globals.score.toString();
        }
        //______________________________
        private addCurrentNumberText() {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aX: number = (aContainerBoundingRect.width - 40) / 2;
            let aY: number = aContainerBoundingRect.height - 100;
            this.mScoreTextStyle = {
                font: "70px Arial",
                wordWrap: true,
                align: "center"
            };
            this.mCurrentNumberText = Globals.gameManager.gameBoard.add.text(aX, aY, Globals.currentNumber.toString(), this.mScoreTextStyle);
            this.mCurrentNumberText.anchor.set(0.5);
        }

        //______________________________
        private addTotalScoreText() {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aX: number = (aContainerBoundingRect.width)  - 100;
            let aY: number = aContainerBoundingRect.height - 100;
            this.mScoreTextStyle = {
                font: "70px Arial",
                wordWrap: true,
                align: "center"
            };
            this.mTotalScore = Globals.gameManager.gameBoard.add.text(aX, aY, "0", this.mScoreTextStyle);
            this.mTotalScore.anchor.set(0.5);
        }
        //____________________________
        //_____________________________
    }
}