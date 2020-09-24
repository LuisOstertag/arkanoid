class Scene1 extends Phaser.Scene{
    constructor() {
        super('Scene1');
    }

preload() {

    this.load.atlas('bloques', './assets/atlas.png', './assets/atlas_atlas.json');
    this.load.image('ball' , './Assets/ball.png');
    this.load.image('padle' , './Assets/barra.png');
    this.load.image("tiles", "assets/tiles1.png");
    this.load.tilemapTiledJSON("World", "assets/tilemap2.json");

   
    
   

}

create(){

    this.map = this.add.tilemap("World");
      var tileset = this.map.addTilesetImage("tiles", "tiles");
      this.backgroundLayer = this.map.createStaticLayer("1", tileset);


    this.physics.world.setBoundsCollision(true, true, true, false);


    
     // Bloques
     this.bricks = this.physics.add.staticGroup({
        setScale: {x: 1, y: 1 },
          key: 'bloques', frame: [ "1", "1", "2","2", "3", "3"  ],
          frameQuantity: 8,
          gridAlign: { width: 8, height: 8, cellWidth: 80, cellHeight: 50, x: 100, y: 100 }
        
      });
    
      
     

         // Bola
    this.ball = this.physics.add.image(400, 545,  'ball').setCollideWorldBounds(true).setBounce(1).setScale(2);
    this.ball.setData('onPaddle', true);
        //Barra
    this.paddle = this.physics.add.image(400, 575, 'padle').setImmovable().setScale(4);


         //  Colisiones
         this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
         this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    
//  Input
this.input.on('pointermove', function (pointer) {

    //  Keep the paddle within the game
    this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);


    //Bola en barra
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
        vida1 = vida1 - 1;
        text.setText('Vidas: ' + vida1);
        if (vida1 >= 1)
         this.resetBall();
         if (vida1 == 0) {
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
        //Ganar nivel1  
        this.scene.start('Scene2');
        
      }
      else {
        
        puntos = puntos + 50;
        texto.setText('Puntos: ' + puntos);
      }
  }
// Resetear bola
resetBall ()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 545);
    this.ball.setData('onPaddle', true);
}
// Resetear nivel
resetLevel ()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);
        });
        
    puntos = 0;
    vida1 = 3;
    texto.setText('Puntos: ' + puntos);
    text.setText('Vidas: ' + vida1);
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