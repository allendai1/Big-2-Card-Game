export default class Card {
    
    constructor(scene,value=null,suit=null) {

        this.value= value
        this.suit = suit
        this.scene = scene

        this.render = (x, y, sprite) => {
            let card = this.scene.add.image(x,y,'blank').setScale(0.2,0.2).setInteractive()
            

            this.scene.load.image(sprite,`src/assets/cards_folder/${sprite}`)
            this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
                card.setTexture(sprite).setVisible(true)
            })
            this.scene.load.start();
            return card
        }
    }
    get name(){
        return `${this.value}${this.suit}.png`
    }
    valueOf(){
        let val = ['3','4','5','6','7','8','9','10','J','Q','K','A','2']
        let suit = ["S","H","C","D"]
        let a=val.indexOf(this.value)+1
        let b = suit.indexOf(this.suit)
        return (4*a)-b
        

    }
    
}