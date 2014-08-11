var _PORT = 9001;
var _MAX_CONNECTIONS = 10;
var _MAX_GAMES_AT_ONCE = 3;

var HTTP = require("http");
var WebSocketServer = require("websocket").server;

var Player = require("C:/xampp/htdocs/Tronline/backend/Player.js");
var Game = require("C:/xampp/htdocs/Tronline/backend/Game.js");


var Games = [];

var Connections = [];

var Queue = [];


var HTTPServer = HTTP.createServer(function(Request, Response){

	Response.writeHead(200, {"Content-type": "text/plain"});
	Response.end();

}).listen(_PORT, "0.0.0.0");

console.log("Listening at "+ _PORT)


var Server = new WebSocketServer({httpServer: HTTPServer, closeTimeout: 2000});


Server.on("request", function(Request){

	var Connection = Request.accept(null, Request.origin);
	console.log("Request recived from: " +Request.remoteAddress);

	Connection.IP = Request.remoteAddress;
	Connection.inGame = false;


	Connection.on("message", function(Message){

		if (Message.type == "utf8"){

			handleClientMessage(Connection, Message.utf8Data);
		}

	});

	Connection.on("close", function(){

		handleClientClosure(Connection)

	});

	Connections.push(Connection)
	Queue.push(Connection);
	if (Queue.length > 1){
		matchMaking();
	}
	//console.log("Queue length: "+Queue.length);
	console.log("Connections length: "+Connections.length);

});



function handleClientMessage(Connection, message){

	try { 

		message = JSON.parse(message);

	} catch (Err){

		return;
	}

	switch(message.Type){
		//console.log("Type");
		case "D": // Direction

			Connection.player.direction = message.Data;
			break;
	}




}


function handleClientClosure(Connection){ // ********** Check if is in game and end it. *************************
	//Connections.splice(Connections.indexOf(Connection), 1);
	Connections.splice(Connections.indexOf(Connection), 1);

	//console.log("Before splicing: "+Queue.length);
	if (!Connection.inGame){
		Queue.splice(Queue.indexOf(Connection), 1);
	}
	//console.log("After splicing: "+Queue.length);

	console.log(Connection.IP + " - Disconected.");
	//delete Connections[id];
}


function matchMaking(){
	// Pair people and start games.
	// Pop out of the queue + registry that connection as playing with the gameid (Games[0][0])
	/*Connections[Queue[0]].gameId = Games.length;
	Connections[Queue[1]].gameId = Games.length;*/
	Queue[0].player = new Player.Player(5, 270, 5, 0);
	Queue[0].inGame = true;
	Queue[1].player = new Player.Player(565, 270, -5, 0);
	Queue[1].inGame = true;



	Games.push(new Game.Game([Queue.shift(), Queue.shift()]));

}

setInterval(function(){
	for (var i = 0; i < Games.length; i++){
		if (Games[i].gameState == 1){
			Games[i].gameLoop();
		}
	}
}, 40);
