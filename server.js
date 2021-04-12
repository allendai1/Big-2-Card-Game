const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let players = {};
let lobbies = {};

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    
    players[socket.id]={
        name: null,
        id: socket.id,
        lobby: null,
        lobby_creator: false,
        cards: [],
        player:0,
    }
   
    socket.on('cardsplayed',function(combo){
        console.log('cardsplayed received')
        console.log(combo)
        let lobbyCode =players[socket.id].lobby
        console.log(lobbyCode)
        socket.to(lobbyCode).emit('updateYourCards',combo)
    })
    socket.on("startgame",function(hand2){
        let lobbyCode =players[socket.id].lobby
        socket.to(lobbyCode).emit("gameStarted",hand2)

            // arr =[hand1,hand2]
            // lobbies[lobbyCode].forEach(function(player){
            //     if(player.id!=socket.id){
            //         player.cards = arr[0]
            //         console.log(player.id)
            //         io.to(player.id).emit("gameStarted",player.cards)
            //     }

            // })
  
        
    })
    
    socket.on("removeLobby",function(lobbyCode){
        delete lobbies[lobbyCode];
        

    });
    //upon receiving requestJoin
    socket.on("requestJoin",function(pw,lobbyCreator){
        // check if lobby exist
        if(pw in lobbies){
            let id = socket.id; 
            // check if lobby is full 
            if(lobbies[pw].length<4 && !lobbies[pw].includes(id)){
                
                players[socket.id].lobby = pw; // set player's current lobby 
                lobbies[pw].push(players[socket.id]); // add to list of current lobbies
                if(lobbyCreator==true){
                    players[socket.id].lobby_creator = true;
                }
                socket.join(pw); // create a room with lobby code as the name of the room
                socket.emit("joinAccepted",pw);
                players[socket.id].player = lobbies[pw].findIndex(pl=>pl.id==socket.id)
                console.log(lobbies)
            }
            else{
                console.log("Lobby is full");
            }
        }
        else{
            console.log("Lobby does not exist");
        }
    });
    socket.on("lobbyLoaded",function(pw){
        let names = lobbies[pw].map(x=> x.name)
        io.to(pw).emit("getPlayerList",names,lobbies[pw].length);
    })
   
    
    socket.on("Name",function(name){
        players[socket.id].name = name;
    })
   
    socket.on('lobbyCreated', function (lobbycode,lobbyCreator) {
        socket.join(lobbycode);
        if(Object.values(lobbies).includes(socket.id)){
            console.log("player already in lobby");
        }
        players[socket.id].lobby = lobbycode.toString();
        players[socket.id].lobby_creator = true;
        lobbies[lobbycode] = [players[socket.id]];
        players[socket.id].player = lobbies[lobbycode].findIndex(pl=>pl.id==socket.id)

    });
    

    socket.on('disconnect', function () {
        let x = Object.keys(lobbies);
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
        x.forEach(function(element){
            let index = lobbies[element].indexOf(socket.id);
            if(index>-1){
                lobbies[element].splice(index,1);
            }
        });      
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});