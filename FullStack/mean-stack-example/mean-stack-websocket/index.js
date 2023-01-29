const http = require("http");
const app = require("express")();
const MongoClient = require('mongodb').MongoClient;

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))

 app.listen(9091, ()=>console.log("Listening on http port 9091"))
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))
//hashmap clients
const clients = {};
const matches = {};




const wsServer = new websocketServer({
    "httpServer": httpServer
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", message => {
        console.log(`Received message => ${message}`);
        const result = JSON.parse(message.utf8Data)

        //a client want to join
        if (result.method === "join") {
            const matchId = result.matchID;
            const clientId = result.clientID;


            if(!matches[matchId]?.id){
                matches[matchId] = {
                    "id": matchId,
                    "clients": []
                }
            }

            const match = matches[matchId];

            match.clients.push({
                "clientID": clientId,
                "color": "red"
            })

            const payLoad = {
                "method": "join",
                "match": match
            }
            //loop through all clients and tell them that people has joined
            match.clients.forEach(c => {
                clients[c.clientID].connection.send(JSON.stringify(payLoad))
            })
        }
        if(result.method === "click"){
            const matchId = result.matchID;
            const clientId = result.clientID;
            const color = result.color;
            const seatId = result.seatID;
            
            let state =matches[matchId].state;
            if(!state){
                state={}
            }
            state[seatId]=color;
            matches[matchId].state=state;

            updateGameState();
        }

    })

    //generate a new clientId
    const clientId = guid();

    clients[clientId] = {
        "connection":  connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    //send back the client connect
    connection.send(JSON.stringify(payLoad))

})


function updateGameState(){

    for (const g of Object.keys(matches)) {
        const match = matches[g]
        const payLoad = {
            "method": "update",
            "game": match
        }

        match.clients.forEach(c=> {
            clients[c.clientID].connection.send(JSON.stringify(payLoad))
        })
    }

    //setTimeout(updateGameState, 500);
}



function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
 

