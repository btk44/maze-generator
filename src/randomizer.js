var randomizer = {
	getRandomPoint: function (limit) {
		var x = Math.floor((Math.random() * limit)),
		    y = Math.floor((Math.random() * limit));
		
		while (x === y || (x === 0 && y === limit -1) || (x === limit -1 && y === 0)){
			y = Math.floor((Math.random() * limit));
		}
		
		return [x, y];
	},
	
	getRandomWallPoint: function (limit, wall, excludeCorners) { // top right bottom left
		var walls = ["top", "right", "bottom", "left"],
			x = 0,
			y = 0;
				
		if(walls.indexOf(wall) === -1){
			wall = walls[Math.floor((Math.random() * walls.length))];
		}
		
		switch(wall) {
			case "top":
				x = Math.floor((Math.random() * limit - 1) +1);
				if (excludeCorners){
					x = x === limit - 1 ? limit - 2 : x;
					x = x === 0 ? 1 : x;
				}
				break;
			case "right": 
				x = limit - 1;
				y = Math.floor((Math.random() * limit - 1) +1);
				if (excludeCorners){
					y = y === limit - 1 ? limit - 2 : y;
					y = y === 0 ? 1 : y;
				}
				break;
			case "bottom":
				x = Math.floor((Math.random() * limit - 1) +1);
				y = limit -1;
				if (excludeCorners){
					x = x === limit - 1 ? limit - 2 : x;
					x = x === 0 ? 1 : x;
				}
				break;
			case "left":
				y = Math.floor((Math.random() * limit - 1) +1);
				if (excludeCorners){
					y = y === limit - 1 ? limit - 2 : y;
					y = y === 0 ? 1 : y;
				}
				break;
		}

		return [x,y];
	}
}
