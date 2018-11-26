var ClickIT;
(function (ClickIT) {
    var Cube = /** @class */ (function () {
        function Cube(pCube, pX, pY, pText) {
            var _this = this;
            this.mCube = pCube;
            this.mCube.name = 'cube' + pText;
            this.mCube.inputEnabled = true;
            this.mCube.checkWorldBounds = true;
            this.mCube.events.onOutOfBounds.add(function () { return _this.onOutFromBoundries(); }, this);
            this.mCube.body.velocity.y = 50 + Math.random() * 200;
            this.mCube.events.onInputDown.add(function () { return _this.onClick(); }, this);
            this.mTextStyle = {
                font: "50px Arial",
                wordWrap: true,
                wordWrapWidth: this.mCube.width,
                wordWrapHeight: this.mCube.height,
                align: "center"
            };
            this.mText = ClickIT.Globals.game.add.text(pX, pY, pText, this.mTextStyle);
            this.mText.anchor.set(0.5);
        }
        //____________________________
        Cube.prototype.onClick = function () {
            ClickIT.Globals.score++;
        };
        //____________________________
        Cube.prototype.onOutFromBoundries = function () {
            //  Move the cube to the top of the screen again
            this.mCube.reset(this.mCube.x, 0);
            //  And give it a new random velocity
            this.mCube.body.velocity.y = 50 + Math.random() * 200;
        };
        Object.defineProperty(Cube.prototype, "text", {
            //____________________________
            get: function () {
                return this.mText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cube.prototype, "cube", {
            //____________________________
            get: function () {
                return this.mCube;
            },
            enumerable: true,
            configurable: true
        });
        return Cube;
    }());
    ClickIT.Cube = Cube;
})(ClickIT || (ClickIT = {}));
var ClickIT;
(function (ClickIT) {
    var Globals = /** @class */ (function () {
        function Globals() {
        }
        Globals.score = 0;
        return Globals;
    }());
    ClickIT.Globals = Globals;
})(ClickIT || (ClickIT = {}));
var ClickIT;
(function (ClickIT) {
    var Main = /** @class */ (function () {
        function Main() {
            this.mWidth = 0;
            this.mHeight = 0;
            this.mContainer = document.getElementById('content');
            this.createGameBoard();
            this.mGame = new ClickIT.Game();
        }
        //_____________________________
        Main.prototype.createGameBoard = function () {
            var _this = this;
            var gameWidth = 640;
            var gameHeight = 960;
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var ratio = windowHeight / windowWidth;
            if (ratio < 1.5) {
                gameWidth = gameHeight / ratio;
            }
            else {
                gameHeight = gameWidth * ratio;
            }
            this.mWidth = gameWidth;
            this.mHeight = gameHeight;
            var aContainerBoundingRect = this.mContainer.getBoundingClientRect();
            ClickIT.Globals.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'content', { preload: function () { return _this.preload(); }, create: function () { return _this.create(); } });
        };
        //____________________________
        Main.prototype.preload = function () {
            //  Add the States your game has.
            ClickIT.Globals.game.state.add("Loader", new ClickIT.Loader());
            ClickIT.Globals.game.state.add("Game", this.mGame);
            //  Now start the Loader state.
            ClickIT.Globals.game.state.start("Loader");
        };
        //____________________________
        Main.prototype.create = function () {
            //Globals.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //Globals.game.scale.pageAlignHorizontally = true;
            //Globals.game.scale.pageAlignVertically = true;
            //Globals.game.stage.disableVisibilityChange = true;
            // Change background color of canvas
            ClickIT.Globals.game.stage.backgroundColor = 'rgba(68, 136, 170, 1)';
            //Globals.game.input.mouse.capture = true;
            //Globals.game.stage.backgroundColor = '#2d2d2d';
            ClickIT.Globals.game.physics.startSystem(Phaser.Physics.ARCADE);
            ClickIT.Globals.game.physics.setBoundsToWorld();
        };
        return Main;
    }());
    ClickIT.Main = Main;
})(ClickIT || (ClickIT = {}));
window.onload = function () {
    new ClickIT.Main();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ClickIT;
(function (ClickIT) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this.mWorldGravity = 100;
            _this.mCurrentNumber = 0;
            _this.mCubes = new Array();
            _this.mContainer = document.getElementById('content');
            return _this;
        }
        //____________________________
        Game.prototype.preload = function () {
        };
        //____________________________
        Game.prototype.create = function () {
            this.mSpritesGroup = ClickIT.Globals.game.add.group();
            this.mSpritesGroup.enableBody = true;
            this.mSpritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.mSprites = new Array();
            var aContainerBoundingRect = this.mContainer.getBoundingClientRect();
            for (var y = 0; y < 1; y++) {
                for (var x = 0; x < 10; x++) {
                    var aCube = this.mSpritesGroup.create(aContainerBoundingRect.left + x * 90, y * 50, 'cube');
                    var aRandom = Math.floor(Math.random() * 100);
                    var aCubeObject = new ClickIT.Cube(aCube, x, y, aRandom.toString());
                    this.mSprites.push(aCubeObject.cube);
                    this.mCubes.push(aCubeObject);
                }
            }
            //  Set the world (global) gravity
            ClickIT.Globals.game.physics.arcade.gravity.y = this.mWorldGravity;
            this.addScore();
        };
        //____________________________
        Game.prototype.update = function () {
        };
        //____________________________
        Game.prototype.render = function () {
            for (var i = 0; i < this.mCubes.length; i++) {
                var aSpriteCube = this.mCubes[i].cube;
                this.mCubes[i].text.x = Math.floor(aSpriteCube.x + aSpriteCube.width / 2);
                this.mCubes[i].text.y = Math.floor(aSpriteCube.y + aSpriteCube.height / 2);
            }
            this.mScoreText.text = ClickIT.Globals.score.toString();
        };
        //______________________________
        Game.prototype.addScore = function () {
            var aContainerBoundingRect = this.mContainer.getBoundingClientRect();
            var aX = (aContainerBoundingRect.width - 40) / 2;
            var aY = aContainerBoundingRect.height - 100;
            this.mScoreTextStyle = {
                font: "70px Arial",
                //fill: "#ff0044",
                wordWrap: true,
                //wordWrapWidth: 100,
                //wordWrapHeight: 100,
                align: "center",
            };
            this.mScoreText = ClickIT.Globals.game.add.text(aX, aY, this.mCurrentNumber.toString(), this.mScoreTextStyle);
            this.mScoreText.anchor.set(0.5);
        };
        return Game;
    }(Phaser.State));
    ClickIT.Game = Game;
})(ClickIT || (ClickIT = {}));
/// <reference path="../../ts_maps/phaser.d.ts" />
var ClickIT;
(function (ClickIT) {
    var Loader = /** @class */ (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            return _super.call(this) || this;
        }
        //______________________________
        Loader.prototype.preload = function () {
            this.load.image('cube', 'www/img/cube.png');
        };
        //______________________________
        Loader.prototype.create = function () {
            // start physics
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //  Now start the Game state.
            this.game.state.start("Game");
        };
        return Loader;
    }(Phaser.State));
    ClickIT.Loader = Loader;
})(ClickIT || (ClickIT = {}));
var ClickIT;
(function (ClickIT) {
    var Menu = /** @class */ (function () {
        function Menu() {
        }
        return Menu;
    }());
    ClickIT.Menu = Menu;
})(ClickIT || (ClickIT = {}));
//# sourceMappingURL=game.js.map