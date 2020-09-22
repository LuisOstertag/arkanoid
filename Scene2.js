class Scene2 extends Phaser.Scene{
    constructor() {
        super('Scene2');
    }

preload() {
    
    this.load.image('fondo' , './assets/fondo.png');
    this.load.tilemapTiledJSON('map1' , './assets/segundo.json');
    this.load.atlas('bloques', './assets/atlas.png', './assets/atlas_atlas.json');
    this.load.image('ball' , './Assets/ball.png');
    this.load.image('padle' , './Assets/barra.png');

   
    
   
   

}

create(){


    //fondo
    map = this.make.tilemap({ key: 'map1' });

    var groundTiles = map.addTilesetImage('fondo');
  
    
    var groundLayer  = map.createDynamicLayer('fondo', groundTiles, 0, 0);    

    this.physics.world.setBoundsCollision(true, true, true, false);


    
     // Bloques
     this.bricks = this.physics.add.staticGroup({
        setScale: {x: 1, y: 1 },
          key: 'bloques', frame: [ "1", "2", "3" ],
          frameQuantity: 8,
          gridAlign: { width: 8, height: 8, cellWidth: 80, cellHeight: 50, x: 100, y: 100 }
        
      });
      this.bricks1 = this.physics.add.staticGroup({
        setScale: {x: 1, y: 1 },
          key: 'bloques', frame: [ "4", "4",  "4", "4"  ],
          frameQuantity: 4,
          gridAlign: { width: 4, height: 4, cellWidth: 170, cellHeight: 50, x: 160, y: 250 }
        
      });
    

         

         // Ball
    this.ball = this.physics.add.image(400, 545,  'ball').setCollideWorldBounds(true).setBounce(1).setScale(2);
    this.ball.setData('onPaddle', true);
        //Barra
    this.paddle = this.physics.add.image(400, 575, 'padle').setImmovable().setScale(4);
        

         //  Colisiones
         this.physics.add.collider(this.ball, this.bricks1, this. hitBrickMetal , null, this);
         this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
         this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    
//  Input 
this.input.on('pointermove', function (pointer) {

    //  Keep the paddle within the game
    this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);


    // Bola en barra
    if (this.ball.getData('onPaddle'))
    {
        this.ball.x = this.paddle.x;
    }

}, this);

this.input.on('pointerup', function (pointer) {

    if (this.ball.getData('onPaddle'))
    {
        this.ball.setVelocity(-75, -300);
        this.ball.setData('onPaddle', false);
    }

}, this);
    

    

    let ClaseVidas = new Vidas({scene: this, x:320, y:600});
    
    let ClasePuntaje = new Puntaje({scene: this, x:320, y:20});

}


update (time, delta)
    {
        // Donde esta la bola
     if (this.ball.y > 600)
     {
        scoreV = scoreV - 1;
        text.setText('Vidas: ' + scoreV);
        if (scoreV >= 1)
         this.resetBall();
         if (scoreV == 0) {
            this.resetLevel();
          
         }
     }
    
        
    }

    
// Destruir bloques
    hitBrick (ball, brick)
  {
      brick.disableBody(true, true);
      
      
      if (this.bricks.countActive() === 0)
      {
        //Ganar
        this.scene.start('GameOver');
        
      }
      else {
        
        score = score + 10;
        texto.setText('Score: ' + score);
      }
  }
  hitBrickMetal (ball, brick)
  {
  }
// Reset ball
resetBall ()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 545);
    this.ball.setData('onPaddle', true);
}
// Reset level
resetLevel ()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);
        });
        
    score = 0;
    scoreV = 3;
    texto.setText('Score: ' + score);
    text.setText('Vidas: ' + scoreV);
    this.scene.start('GameOver');

}

    hitPaddle (ball, player)
    {
        var diff = 0;
  
        if (ball.x < player.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = player.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > player.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -player.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }


    
   




}