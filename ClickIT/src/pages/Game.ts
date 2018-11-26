module ClickIT {
    export class Game extends Phaser.State {
        private mGame;

        private mSprite1: Phaser.Sprite;
        private mWorldGravity: number = 100;
        private mSpritesGroup: Phaser.Group;
        private mCurrentNumber: number = 0;
        private mNextNumber: number;
        private mCurrentVelocity: number;
        private mSprites: Array<any>;
        private mCubes: Array<Cube>;
        private mContainer: HTMLDivElement;
        private mScoreText: any;
        private mScoreTextStyle: any;

        private mWidth: number;
        private mHeight: number;
        constructor() {
            super();
            this.mCubes = new Array<Cube>();
            this.mContainer = document.getElementById('content') as HTMLDivElement;
        }
     
        //____________________________
        public preload() {

        }
        //____________________________
        public create() {
            this.mSpritesGroup = Globals.gameManager.gameBoard.add.group();
            this.mSpritesGroup.enableBody = true;
            this.mSpritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.mSprites = new Array<any>();
           

            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 1; x++) {
                    setTimeout(() => this.addCubeObject(x, y), y * 1000);
                }
            }
            //  Set the world (global) gravity
            Globals.gameManager.gameBoard.physics.arcade.gravity.y = this.mWorldGravity;
            this.addScore();
        }
        //____________________________
        private addCubeObject(pX: number, pY: number): void {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aMaxX: number = aContainerBoundingRect.width - 50;
            let aRandomX: number = Math.floor(Math.random() * aMaxX);
            let aCube = this.mSpritesGroup.create(aContainerBoundingRect.left + pX + aRandomX, pY * 50, 'cube');
            let aRandom: number = this.getRandomNumber();

            if (pY == 3) {
                aRandom = Globals.score;
            }

            let aCubeObject: Cube = new Cube(aCube, pX, pY, aRandom);
            this.mSprites.push(aCubeObject.cube);
            this.mCubes.push(aCubeObject);
        }
        //____________________________
        public getRandomNumber(): number {
            let aMin: number = Globals.score + 1;
            let aMax: number = Globals.score + 10;

            var num = Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
            return (num === Globals.score) ? this.getRandomNumber() : num;
        }
        //____________________________
        public update() {
          
        }
        //____________________________
        public render() {
            for (let i: number = 0; i < this.mCubes.length; i++) {
                let aSpriteCube = this.mCubes[i].cube;
                this.mCubes[i].text.x = Math.floor(aSpriteCube.x + aSpriteCube.width / 2);
                this.mCubes[i].text.y = Math.floor(aSpriteCube.y + aSpriteCube.height / 2);
            }

            this.mScoreText.text = Globals.score.toString();
        }
        //______________________________
        private addScore() {
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            let aX: number = (aContainerBoundingRect.width - 40) / 2;
            let aY: number = aContainerBoundingRect.height - 100;
            this.mScoreTextStyle = {
                font: "70px Arial",
                //fill: "#ff0044",
                wordWrap: true,
                //wordWrapWidth: 100,
                //wordWrapHeight: 100,
                align: "center",
                //backgroundColor: "#ffff00"
            };

            this.mScoreText = Globals.gameManager.gameBoard.add.text(aX, aY, Globals.score.toString(), this.mScoreTextStyle);
            this.mScoreText.anchor.set(0.5);


        }
        //____________________________
        //_____________________________
    }
}