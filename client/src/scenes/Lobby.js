import PlayArea from "./PlayArea"
export default class Lobby extends Phaser.Scene {
    constructor(){
        super("Lobby");
    }
    init(data){
        this.socket = data.socket;
        this.lobbyCode = data.lobbyCode

    }
    create(){
        
        console.log("this is the lobby scene")
        let lobbycreator = false;
        let self = this;
        let playerlist;
        this.add.text(800,50,this.lobbyCode);
        this.add.text(800,100,this.socket.id);
        this.lobbyPlayerList = this.add.text(100,75,"PLAYERS:")
        this.socket.emit("lobbyLoaded",this.lobbyCode);

        this.socket.on("getPlayerList",function(playerList){
            self.lobbyPlayerList.setText("PLAYERS: "+ playerList);
        })
        this.socket.on("gameStarted",function(x){
            self.scene.start("PlayArea",{
                socket: self.socket,
                cards: x,
                myTurn: false,
            })
        })
        
        


    }
        
    
    

}