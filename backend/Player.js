var Vector2 = require("C:/xampp/htdocs/Tronline/backend/Vector2.js");
var Player = function(x, y, sx, sy){
	this.pos = new Vector2.Vector2(x, y);
	var speed = new Vector2.Point(sx, sy);
	this.direction = 0;

	this.update = function(){
		if (this.direction != 0){
			switch(this.direction){
				case 1:
					if (speed.x != 5){speed.y = 0; speed.x = -5;} break;
				case 2:
					if (speed.y != 5){speed.x = 0; speed.y = -5;} break;
				case 3:
					if (speed.x != -5){speed.y = 0; speed.x = 5;} break;
				case 4:
					if (speed.y != -5){speed.x = 0; speed.y = 5;} break;
			}
		}


		this.pos.x += speed.x;// * interval);
		this.pos.y += speed.y;// * interval);

		if (this.pos.x == 570 && speed.x == 5){
			this.pos.x = 0;
		}else if (this.pos.x == -5 && speed.x == -5){
			this.pos.x = 565;
		}else if (this.pos.y == 570 && speed.y == 5){
			this.pos.y = 0;
		}else if (this.pos.y == -5 && speed.y == -5){
			this.pos.y = 565;
		}

		this.direction = 0;
		
	};

	this.position = function(){
		return new Vector2.Point(this.pos.x, this.pos.y);
	};
};

if (typeof exports !== "undefined"){
	exports.Player = Player;
}

