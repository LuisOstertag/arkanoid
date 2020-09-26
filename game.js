var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Menu,Scene1,Scene2,GameOver]
};
var game = new Phaser.Game(config);


var map;
var cursors;
var text;
var texto;
var groundLayer;
var onPaddle;
var paddle;
var ball;
var bricks;
var bricks1;
var score = 0;
var puntos = 0;
var vida1 = 3;
var ball1


