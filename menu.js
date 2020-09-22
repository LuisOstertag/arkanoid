class Menu extends Phaser.Scene{
    constructor() {
        super('menu');
    }

preload() {

    this.load.image("menu", "./assets/menu.png");

   
    
   

}

create(){

    this.add.image(400, 320, 'menu');
var texto = this.add.text(330, 300, "Jugar", { fontSize: '60px Arial', color: 'red' })
    var texto = this.add.text(300, 380, "Nivel 1",  { fontSize: '60px Arial', color: 'red' });
     texto.setInteractive()
     texto.on('pointerdown', () => {
         this.scene.start('Scene1');
     } );

     var texto = this.add.text(300, 450, "Nivel 2",  { fontSize: '60px Arial', color: 'red' });
     texto.setInteractive()
     texto.on('pointerdown', () => {
         this.scene.start('Scene2');
     } );


 
}
}
