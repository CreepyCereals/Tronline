var CANVAS_WIDTH = 570;
var CANVAS_HEIGHT = 570;

/* Globals: */

var ctx, ws;
var colors = ["#FF7519", "#0000FF"]

players = [];

function createCanvas(){

	var canvas = document.createElement("canvas");

	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	canvas.id = "canvas";

	ctx = canvas.getContext('2d');
	ctx.shadowBlur = 6;


	document.getElementById("canvas-container").appendChild(canvas);


	ws = new WebSocket("ws://localhost:9001");

	ws.onopen = function(){


	};


	ws.onmessage = function(E){

		var Message;

		try{ 
			Message = JSON.parse(E.data); 
		} catch (Err) {
			return;
		}

		switch (Message.Type){
			case "GAME":
				gameManager(Message.Data);
				break;
			case "ANOUNCE":
				break;
			}


	};


}

function gameManager(Message){

	try{ 
		Message = JSON.parse(Message); 
	} catch (Err) {
		alert("ERROR");
		return;
	}

	render(Message);



}

function render(positions){
	for (var i = 0; i < positions.length; i++){
		//alert(i +" X: "+positions[i][0]+" Y: "+positions[i][1])
		ctx.save();
		ctx.translate(positions[i][0], positions[i][1]);
		ctx.fillStyle = colors[i];
		ctx.shadowColor = colors[i];
		ctx.fillRect(0, 0, 5, 5);
		ctx.restore();

	}
}


document.addEventListener("keydown", function(E){

	if (E.which == 37){ws.send(JSON.stringify({Type: "D", Data: 1}))}//player.direction = 1;}// && player.speed.x == 0){player.speed.x = -5; player.speed.y = 0;}
	else if (E.which == 38){ws.send(JSON.stringify({Type: "D", Data: 2}))}//player.direction = 2;}// && player.speed.y == 0){player.speed.y = -5; player.speed.x = 0;}
	else if (E.which == 39){ws.send(JSON.stringify({Type: "D", Data: 3}))}//player.direction = 3;}// && player.speed.x == 0){player.speed.x = 5; player.speed.y = 0;}
	else if (E.which == 40){ws.send(JSON.stringify({Type: "D", Data: 4}))}//player.direction = 4;}// && player.speed.y == 0){player.speed.y = 5; player.speed.x = 0;}

});
