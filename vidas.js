class Vidas extends Phaser.GameObjects.Text{

    constructor(config){

        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        text = config.scene.add.text(config.x, config.y, 'Vidas: ' + vida1, { fontSize: '40px Arial', color: 'red' });
        
    }

}