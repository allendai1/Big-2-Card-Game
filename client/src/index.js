import Phaser from "phaser";
import Menu from "./scenes/Menu"
import LobbyScene from "./scenes/LobbyScene"
import EnterName from "./scenes/EnterName"
import Lobby from "./scenes/Lobby"
import CreatorLobby from "./scenes/CreatorLobby"
import JoinLobby from "./scenes/JoinLobby"
import PlayArea from "./scenes/PlayArea"
const config = {
    type: Phaser.AUTO,
    parent: "divId",
    dom: {createContainer:true},
    width: 1900,
    height: 949,
    scene: [EnterName,Menu,LobbyScene,Lobby,CreatorLobby,JoinLobby,PlayArea],
    backgroundColor: "#408000",
};

const game = new Phaser.Game(config);
