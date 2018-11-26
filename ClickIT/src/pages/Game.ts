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
            this.mSpritesGroup = Globals.game.add.group();
            this.mSpritesGroup.enableBody = true;
            this.mSpritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.mSprites = new Array<any>();
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();

            for (let y = 0; y < 1; y++) {
                for (let x = 0; x < 10; x++) {
                    let aCube = this.mSpritesGroup.create(aContainerBoundingRect.left + x * 90, y * 50, 'cube');
                    let aRandom: number = Math.floor(Math.random() * 100);
                    let aCubeObject: Cube = new Cube(aCube, x, y, aRandom.toString());
                    this.mSprites.push(aCubeObject.cube);
                    this.mCubes.push(aCubeObject);

                }
            }
            //  Set the world (global) gravity
            Globals.game.physics.arcade.gravity.y = this.mWorldGravity;
            this.addScore();
        }
        //____________________________
        public update() {
            for (let i: number = 0; i < this.mCubes.length; i++) {
                let aSpriteCube = this.mCubes[i].cube;
                this.mCubes[i].text.x = Math.floor(aSpriteCube.x + aSpriteCube.width / 2);
                this.mCubes[i].text.y = Math.floor(aSpriteCube.y + aSpriteCube.height / 2);
            }

            this.mScoreText.text = Globals.score.toString();
        }
        //____________________________
        public render() {
           
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

            this.mScoreText = Globals.game.add.text(aX, aY, this.mCurrentNumber.toString(), this.mScoreTextStyle);
            this.mScoreText.anchor.set(0.5);


        }
        //____________________________
        //_____________________________
    }
}