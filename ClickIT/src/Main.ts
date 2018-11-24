﻿/// <reference path="../ts_maps/phaser.d.ts" />
module ClickIT {
    export class Main {
        private mGame: Phaser.Game;
        private mSprite1: Phaser.Sprite;
        private mSprite2: Phaser.Sprite;
        private mSprite3: Phaser.Sprite;
        private mSprite4: Phaser.Sprite;
        constructor() {
            let aContainerDiv: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
            let aContainerBoundingRect: ClientRect = aContainerDiv.getBoundingClientRect();
            this.mGame = new Phaser.Game(aContainerBoundingRect.width, aContainerBoundingRect.height, Phaser.AUTO, 'phaser-example', { preload: () => this.preload(), create: () => this.create(), render: () => this.render() });
        }
        //____________________________
        private preload() {
            this.mGame.load.image('ilkke', 'www/img/ilkke.png');
        }
        //____________________________
        private create() {

            this.mGame.stage.backgroundColor = '#2d2d2d';

            this.mGame.physics.startSystem(Phaser.Physics.ARCADE);

            //  Set the world (global) gravity
            this.mGame.physics.arcade.gravity.y = 100;
            //  Sprite 1 will use the World (global) gravity
            this.mSprite1 = this.mGame.add.sprite(100, 96, 'ilkke');

            //  Sprite 2 is set to ignore the global gravity and use its own value
            this.mSprite2 = this.mGame.add.sprite(300, 96, 'ilkke');

            //  Sprite 3 will use both the world gravity and its own gravityScale modifier
            this.mSprite3 = this.mGame.add.sprite(500, 96, 'ilkke');

            //  Sprite 4 will ignore all gravity
            this.mSprite4 = this.mGame.add.sprite(700, 96, 'ilkke');

            // Enable physics on those sprites
            this.mGame.physics.enable([this.mSprite1, this.mSprite2, this.mSprite3, this.mSprite4], Phaser.Physics.ARCADE);

            this.mSprite1.body.collideWorldBounds = true;
            this.mSprite1.body.bounce.y = 0.8;

            //this.mSprite2.body.collideWorldBounds = true;
            ////this.mSprite2.body.bounce.y = 0.8;
            ////this.mSprite2.body.gravity.y = 200;

            // this.mSprite3.body.collideWorldBounds = true;
            // this.mSprite3.body.bounce.y = 0.8;
            // this.mSprite3.body.gravity.y = 50;

            //this.mSprite4.body.allowGravity = false;

        }
        //____________________________
        private render() {

            this.mGame.debug.text('world gravity', this.mSprite1.x - 32, 64);
            this.mGame.debug.text('local gravity', this.mSprite2.x - 32, 64);
            this.mGame.debug.text('local / 2', this.mSprite3.x - 32, 64);
            this.mGame.debug.text('no gravity', this.mSprite4.x - 32, 64);
        }
        //____________________________
    }
}

window.onload = () => {
    new ClickIT.Main();
}