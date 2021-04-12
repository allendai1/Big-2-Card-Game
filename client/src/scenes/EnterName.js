import Menu from "./Menu"
import io from 'socket.io-client';

export default class EnterName extends Phaser.Scene {
    constructor(){
        super("EnterName");
    }
    
    preload(){
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }
    create(){
        console.log("this is the entername scene")
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });
        let self = this;
        
        
        var container = this.add.container(700, 400);
        
        var inputText = this.add.rexInputText(900, 400, 300, 100, {
            id: 'myNameInput',
            type: 'textArea',
            text: '',
            fontSize: '30px',
            placeholder: "Enter a name",
            color:0x000000,
            border: 1,
            backgroundColor: 0x00ff00,
            maxLength: 4,
            selectAll: true,
        })
        
        this.enterText = this.add.text(885,500,"Enter").setInteractive();
        this.enterText.on("pointerdown",function(){
            // console.log(inputText.text);
            self.socket.emit("Name",inputText.text);
            self.scene.start("Menu",self.socket);
            
            
        })


    }

}