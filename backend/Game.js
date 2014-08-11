var Game = function(Connections){

	this.CANVAS_WIDTH = 570;
	this.CANVAS_HEIGHT = 570;

	/* Globals: */
	this.Connections = Connections;
	this.unities = [];
	this.gameState = 0;


	this.gameLoop = function(){
		if (this.gameState != 0){

			this.logic();
			this.refresh();
		}
	};

	this.startGame = function(){

		this.gameState = 1;

	};


	this.logic = function(){

		for (var i = 0; i < this.Connections.length; i++){
			this.Connections[i].player.update();
			this.collisions(this.Connections[i].player);
			this.unities.push(this.Connections[i].player.position());
		}

	};

	this.refresh = function(){
		// Send data to the players
		for (var i = 0; i < Connections.length; i++){
			this.Connections[i].send(JSON.stringify({Type: "GAME", Data: JSON.stringify([[this.Connections[0].player.position().x, this.Connections[0].player.position().y], [this.Connections[1].player.position().x, this.Connections[1].player.position().y]])}));
		}

	};

	this.collisions = function(player){ //******************************* CAN IMPROVE PERFORMANCE
		if ((player.pos.collides(this.unities))) {// || (player.pos.x >= 570 || player.pos.x < 0 || player.pos.y >= 570 || player.pos.y < 0 )){
			this.gameState = 0;
		}


	};
	this.startGame();


}


if (typeof exports !== "undefined"){
	exports.Game = Game;
}
