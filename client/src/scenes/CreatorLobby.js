import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import EnterName from "./EnterName";
import Menu from "./Menu";
import Deck from '../helpers/deck';
import PlayArea from "./PlayArea"
export default class CreatorLobby extends Phaser.Scene {
    constructor(){
        super("CreatorLobby");
        
    }
    init(data){
        this.socket = data;

    }
    preload(){
        this.load.image('red_back', 'src/assets/cards_folder/red_back.png');
    }
  
    create(){
        console.log("this is the creatorlobby scene")
        let self = this;
        let lobbyCount=1
        let lobbycreator = true
        let code = this.add.text(75, 550, "").setFontSize(200);
        let lobbyCode = Phaser.Math.Between(0,9999);
        code.setText(lobbyCode);
        this.lobbyList = this.add.text(100,75,"PLAYERS:")
        this.socket.emit('lobbyCreated',lobbyCode);
        this.socket.on("getPlayerList",function(playerList,count){
            self.lobbyList.setText("PLAYERS: " + playerList)
            lobbyCount=count
        })
        
       this.startGame = this.add.text(100,100,"Start Game").setInteractive();
       this.startGame.on("pointerover",()=>{
            self.startGame.setColor('#ff69b4');
        })
       this.startGame.on("pointerout",()=>{
            self.startGame.setColor('#00ffff');
        })
        
        this.startGame.on('pointerdown',()=>{
            console.log(lobbyCount)
            if(lobbyCount>=1){
                let deck = new Deck()
            let [hand1,hand2,hand3,hand4] = deck.split2()
            self.socket.emit('startgame',hand2,hand3,hand4);
            self.scene.start("PlayArea",{
                socket: self.socket,
                cards: hand1,
                myTurn: true,
            })

            }
            
            
            

            
        
           
           

        })
        // this.socket.on("gameStarted",function(x){
        //     self.scene.start("PlayArea",{
        //         socket: self.socket,
        //         cards: x,
        //     })
        // })
        
        
        

        

    }
    
    
    update(){

    }
        
    
    

}