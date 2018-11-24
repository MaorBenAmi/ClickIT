var Phaser = Phaser;
module ClickIT {
    export class Main {
        private mSprite1: /*Phaser.Sprite*/any;
        private mWorldGravity: number = 100;
        private mSpritesGroup: /*Phaser.Group*/ any;
        private mCurrentNumber: number;
        private mNextNumber: number;
        private mCurrentVelocity: number;
        private mSprites: Array<any>;
        private mCubes: Array<Cube>;
        private mContainer: HTMLDivElement;
        private mScore: any;

        constructor() {
            this.mContainer = document.getElementById('content') as HTMLDivElement;
            let aContainerBoundingRect: ClientRect = this.mContainer.getBoundingClientRect();
            this.mCubes = new Array<Cube>();
            Globals.game = new Phaser.Game(aContainerBoundingRect.width, aContainerBoundingRect.height, Phaser.AUTO, 'phaser-example', { preload: () => this.preload(), create: () => this.create(), update: () => this.update(),/*, render: () => this.render() */ });

        }
        //____________________________
        private preload() {
            Globals.game.load.image('cube', 'www/img/cube.png');
        }
        //____________________________
        private create() {

            Globals.game.stage.backgroundColor = '#2d2d2d';

            Globals.game.physics.startSystem(Phaser.Physics.ARCADE);
            Globals.game.physics.setBoundsToWorld();

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
        }
        //____________________________
        private update() {
            for (let i: number = 0; i < this.mCubes.length; i++) {
                let aSpriteCube = this.mCubes[i].cube;
                this.mCubes[i].text.x = Math.floor(aSpriteCube.x + aSpriteCube.width / 2);
                this.mCubes[i].text.y = Math.floor(aSpriteCube.y + aSpriteCube.height / 2);
            }
        }
        //____________________________
        private render() {
 
        }
        ////____________________________
        //private alienOut(pCube) {

        //    //  Move the cube to the top of the screen again
        //    pCube.reset(pCube.x, 0);

        //    //  And give it a new random velocity
        //    pCube.body.velocity.y = 50 + Math.random() * 200;

        //}
        //____________________________
    }
}

window.onload = () => {
    new ClickIT.Main();
}