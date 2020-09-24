class GameOver extends Phaser.Scene{
    constructor() {
        super('GameOver');
    }

preload() {

    this.load.image("menu", "./assets/menu.png");

   
    
   

}

create(){
    this.add.image(400, 320, 'menu');
var texto = this.add.text(240, 300, "Fin del Juego", { fontSize: '60px Arial', color: 'red' })

    var texto = this.add.text(300, 420, "Menu",  { fontSize: '60px Arial', color: 'red' });
     texto.setInteractive()
     texto.on('pointerdown', () => {
         this.scene.start('menu');
     } );

    


 
}
}