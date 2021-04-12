import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import EnterName from "./EnterName";
import Menu from "./Menu";
import Lobby from "./Lobby";
export default class JoinLobby extends Phaser.Scene {
    constructor(){
        super("JoinLobby");
    }
    init(data){
        this.socket = data;

    }
    preload(){
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }
    create(){
        let lobbyCreator = false;
        console.log("this is the JoinLobby scene")
        let self=  this;

        //text-input box
        self.inputCode = self.add.rexInputText(200, 200, 100, 50, {
            id: 'inputCode',
            type: 'textArea',
            text: '',
            maxLength: 4,
            fontSize: '15px',
            placeholder: "enter code",
            color:0x000000,
            
            backgroundColor: 0x00ff00,
            
        });

        //join button
        self.joinText = self.add.text(75,300,"JOIN").setInteractive();
            self.joinText.on("pointerdown",function(){
                let pw = self.inputCode.text;
                //send requestJoin signal to server
                self.socket.emit("requestJoin",pw,lobbyCreator);
            });

        
        this.socket.on("joinAccepted",function(pw){
            
            let x=pw;
            self.scene.start("Lobby",{
                socket: self.socket,
                lobbyCode: x,
                
            });
            
            
            
        })
            

       


    }
    update(){
        
    }
        
    
    

}