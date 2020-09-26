class Vidas extends Phaser.GameObjects.Text{

    constructor(config){

        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        text = config.scene.add.text(config.x, config.y, 'Vidas: ', { fontSize: '40px Arial', color: 'red' });
        this.scene.events.on('update', this.update , this);

        this.ball1 = config.scene.add.image(410, 615,  'atlas', "ball").setScale(2);
        this.ball2 = config.scene.add.image(430, 615,  'atlas', "ball").setScale(2);
        this.ball3 = config.scene.add.image(450, 615,  'atlas', "ball").setScale(2);}


update(){
    if (vida1 === 2 ){
        this.ball3.destroy();
   
       } else  {
       if (vida1 === 1)
       {
           this.ball2.destroy();
       }else  {}
       
         
       }

}
      

        
    


}