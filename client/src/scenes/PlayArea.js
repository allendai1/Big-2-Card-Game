import Card from '../helpers/card';
import Deck from '../helpers/deck'
import CreatorLobby from "./CreatorLobby"
import Zone from "../helpers/zone"
export default class PlayArea extends Phaser.Scene {
    constructor(){
        super("PlayArea")

    }

    preload(){
        this.load.image('blank', 'src/assets/cards_folder/red_back.png');
        this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);

    }

    init(obj){
        
        this.socket = obj.socket
        this.cards = obj.cards
        this.myTurn = obj.myTurn
        
    }

    create(){
        let self=this
        let hand =[]
        let combo = []
        let opponentCards = []
        let cardsOnField=[]
        
        console.log('initiated')
        for(let i=0;i<17;i++){
            opponentCards[i] = self.add.image(700+(i*35),300,'blank').setScale(0.2,0.2)
            hand.push(new Card(this,this.cards[i].value,this.cards[i].suit))
            hand[i].image = hand[i].render(700+(i*35),800,hand[i].name)
            
            hand[i].image.on('pointerdown',function(){
                
                if(hand[i].image.y==780 && self.myTurn){
                    hand[i].image.setPosition(700+(i*35),800)
                    combo.pop()
                }
                else if(self.myTurn){
                    console.log(hand[i].valueOf())
                    combo.push({
                        value:hand[i].value,
                        suit:hand[i].suit,
                        image:hand[i].image,
                    })
                    hand[i].image.setPosition(700+(i*35),780)
                }
            })
            hand[i].image.on('pointerover',function(){
                if(self.myTurn){
                    this.setTint(0x00ff00);
                }
                
            })
            hand[i].image.on('pointerout',function(){
                if(self.myTurn){
                    this.clearTint()
                }
            })
        }

        this.playCards = this.add.text(400,400,'PLAY CARDS').setInteractive()
        this.playCards.on("pointerdown",function(){
            if(self.myTurn==true){
                if(cardsOnField.length>0){
                    for(let i=0;i<cardsOnField.length;i++){ 
                        let x=cardsOnField[i] 
                        x.destroy() 
                    }
                    cardsOnField.length=0
                }
                let i=0
                combo.forEach((card)=>{
                    card.image.moveTo = self.plugins.get('rexmovetoplugin').add(card.image, {
                        speed: 400,
                        rotateToTarget: false
                    })
                    cardsOnField.push(card.image.moveTo.moveTo(800+(i*22), 550));
                    i++
                })
                self.socket.emit('cardsplayed',combo)
                combo=[]
                self.myTurn = !self.myTurn
            }
        })
        
        this.socket.on("updateYourCards",function(combo){
            if(cardsOnField.length>0){
               
                for(let i=0;i<cardsOnField.length;i++){ 
                    let x=cardsOnField[i] 
                    x.destroy() 
                }
                cardsOnField.length=0
            }
            console.log(combo)
            for(let i=0;i<combo.length;i++){
                let card = opponentCards.pop()
                card.destroy()
                cardsOnField.push(new Card(self,combo[i].value,combo[i].suit))
                cardsOnField[i]=cardsOnField[i].render(800+(i*22),550,cardsOnField[i].name)


            }
            self.myTurn = !self.myTurn
        })
    }
    
}