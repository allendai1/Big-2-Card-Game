import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import EnterName from "./EnterName";
import CreatorLobby from "./CreatorLobby";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }
    init(data){
        this.socket = data;

    }
    

    preload() {        

    }

    create() {
        console.log("this is the menu scene")
        let self = this;
        
        this.joinLobbyText = this.add.text(75,440,"JOIN LOBBY").setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive()
        this.createLobbyText = this.add.text(75, 550, 'CREATE LOBBY').setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.joinLobbyText.on('pointerover',function(){
            self.joinLobbyText.setColor('#ff69b4');
            
        });
        this.joinLobbyText.on('pointerout', function () {
            self.joinLobbyText.setColor('#00ffff');
        });
        
        this.createLobbyText.on('pointerover',function(){
            self.createLobbyText.setColor('#ff69b4');
            
        })
        this.createLobbyText.on('pointerout', function () {
            self.createLobbyText.setColor('#00ffff');
        })

        //creator lobby scene button
        this.createLobbyText.on('pointerdown',function(){
            self.scene.start("CreatorLobby",self.socket);
        })

        //join lobby scene button
        this.joinLobbyText.on('pointerdown', function () {

            self.scene.start("JoinLobby",self.socket);
            
        });
        
  
    }

    update() {
    }
    
}
