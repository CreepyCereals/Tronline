var Vector2 = function(x, y){

	this.x = x;
	this.y = y;
	this.collides = function(Vectors){
		for (var i = 0; i < Vectors.length; i++){
			if (Vectors[i].x == this.x && Vectors[i].y == this.y){
				return true;
			}
		}
		return false;
	};

};


var Point = function(x, y){
	this.x = x;
	this.y = y;
};


if (typeof exports !== "undefined"){
	exports.Vector2 = Vector2;
	exports.Point = Point;
}