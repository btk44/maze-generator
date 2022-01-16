var labirynthGenerator = {
	generateLabirynth: function (size, entrance, exit) { 
		var mg = this,
			wallColour = "black",
			map = mg.buildMap(size, entrance, exit),
			cell;

		for(var i = 0; i < size; i++){
			for(var j = 0; j < size; j++){
				cell = labirynthDrawer.createCell(i,j, size);
				cell.style.borderTopColor =  map[j][i].N === mg.mazeObjects.doubleWall ? wallColour : labirynthDrawer.cellBackground;
				cell.style.borderRightColor = map[j][i].E === mg.mazeObjects.doubleWall ? wallColour : labirynthDrawer.cellBackground;
				cell.style.borderLeftColor = map[j][i].W === mg.mazeObjects.doubleWall ? wallColour : labirynthDrawer.cellBackground;
				cell.style.borderBottomColor = map[j][i].S === mg.mazeObjects.doubleWall ? wallColour : labirynthDrawer.cellBackground;

				if(map[j][i].special){
					if(map[j][i].special === "entrance"){
						cell.style.backgroundColor = "red";
					}
					if(map[j][i].special === "exit"){
						cell.style.backgroundColor = "green";
					}
				}
			}
		}
	},

	directions: {
		N: "N",
		E: "E",
		S: "S",
		W: "W"
	},

	mazeObjects: {
		wall: "W",
		doubleWall: "WW",
		path: " ",
		unknown: "O",
		entrance: "S",
		exit: "X",
		getRandomExploreValue: function(){
			var exploreValues = [this.wall, this.wall, this.wall, this.unknown, this.unknown];
			return exploreValues[Math.floor(Math.random()*exploreValues.length)];
		}
	},

	getBorderFromAdjustedRoom: function (map, x, y, direction){
		var mg = this,
			adjustedRoomProperties = {x: x, y: y, wantedBorder: undefined },
			adjustedRoom;

		switch(direction){
			case mg.directions.N: adjustedRoomProperties = {x : x,     y: y - 1, wantedBorder: mg.directions.S }; break;
			case mg.directions.E: adjustedRoomProperties = {x : x + 1, y: y,     wantedBorder: mg.directions.W }; break;
			case mg.directions.S: adjustedRoomProperties = {x : x,     y: y + 1, wantedBorder: mg.directions.N }; break;
			case mg.directions.W: adjustedRoomProperties = {x : x - 1, y: y,     wantedBorder: mg.directions.E }; break;
		}

		if([-1, map.length].indexOf(adjustedRoomProperties.x) >= 0 || [-1, map.length].indexOf(adjustedRoomProperties.y) >= 0){
			return mg.mazeObjects.doubleWall;
		}

		adjustedRoom = map[adjustedRoomProperties.y][adjustedRoomProperties.x];

		if (adjustedRoom){
			switch(adjustedRoom[adjustedRoomProperties.wantedBorder]){
				case mg.mazeObjects.unknown:
					adjustedRoom[adjustedRoomProperties.wantedBorder] = mg.mazeObjects.path;
					return mg.mazeObjects.path;
				case mg.mazeObjects.wall:
					adjustedRoom[adjustedRoomProperties.wantedBorder] = mg.mazeObjects.doubleWall;
					return mg.mazeObjects.doubleWall;
				case mg.mazeObjects.doubleWall:
					return mg.mazeObjects.doubleWall;
			}
		}

		return mg.mazeObjects.getRandomExploreValue();
	},

	explorePath(size, room, map){
		var mg = this,
			newRoom, randomExploreOrder;
		
		if(!map){
			map = [];
			for (var i = 0; i < size; i++){
				map[i] = Array(size);
			}
		}

		map[room.y][room.x] = room;

		randomExploreOrder = mg.getRandomDirectionsList();
		for(var i = 0; i < randomExploreOrder.length; i++){
			if(room[randomExploreOrder[i]] === mg.mazeObjects.unknown){
				room[randomExploreOrder[i]] = mg.mazeObjects.path;
				switch(randomExploreOrder[i]){
					case mg.directions.N:
						newRoom = {
							x: room.x,
							y: room.y - 1,
							N: room.y - 1 === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y - 1, mg.directions.N),
							E: room.x     === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y - 1, mg.directions.E),
							S: mg.mazeObjects.path,
							W: room.x     === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y - 1, mg.directions.W)
						}; break;
					case mg.directions.E:
						newRoom = {
							x: room.x + 1,
							y: room.y,
							N: room.y     === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x + 1, room.y, mg.directions.N),
							E: room.x + 1 === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x + 1, room.y, mg.directions.E),
							S: room.y     === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x + 1, room.y, mg.directions.S),
							W: mg.mazeObjects.path
						}; break;
					case mg.directions.S:
						newRoom = {
							x: room.x,
							y: room.y + 1,
							N: mg.mazeObjects.path,
							E: room.x     === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y + 1, mg.directions.E),
							S: room.y + 1 === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y + 1, mg.directions.S),
							W: room.x     === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x, room.y + 1, mg.directions.W)
						}; break;
					case mg.directions.W:				
						newRoom = {
							x: room.x - 1,
							y: room.y,
							N: room.y     === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x - 1, room.y, mg.directions.N),
							E: mg.mazeObjects.path,
							S: room.y     === size - 1 ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x - 1, room.y, mg.directions.S),
							W: room.x - 1 === 0        ? mg.mazeObjects.doubleWall : mg.getBorderFromAdjustedRoom(map, room.x - 1, room.y, mg.directions.W)
						}; break;
				}
				map = mg.explorePath(size, newRoom, map);
			}
		}

		return map;
	},

	getRandomDirectionsList: function() {
		var values = [this.directions.N, this.directions.E, this.directions.S, this.directions.W],
  		    currentIndex = values.length, temporaryValue, randomIndex;

	    while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

		    temporaryValue = values[currentIndex];
		    values[currentIndex] = values[randomIndex];
		    values[randomIndex] = temporaryValue;
		}

		return values;
	},
	
	buildMap: function(size, entranceCoords, exitCoords){
		var mg = this,
			entrance, exit, map, incompleteRoomFound, incompleteRoom, randomCheckOrder;
		
		entrance = {
			x: entranceCoords[0],
			y: entranceCoords[1],
			N: mg.mazeObjects.doubleWall,
			E: mg.mazeObjects.unknown,
			S: mg.mazeObjects.doubleWall,
			W: mg.mazeObjects.doubleWall,
			special: "entrance"
		};

		incompleteRoom = entrance;
		incompleteRoomFound = true;
		while(incompleteRoomFound){
			map = mg.explorePath(size, incompleteRoom, map);
			incompleteRoomFound = map.some(function (row){
				return row.some(function(cell){
					incompleteRoom = cell;
					randomCheckOrder = mg.getRandomDirectionsList();
					for(var i = 0; i < randomCheckOrder.length; i++){
						if(cell[randomCheckOrder[i]] === mg.mazeObjects.wall){
							cell[randomCheckOrder[i]] = mg.mazeObjects.unknown;
							incompleteRoom = cell;
							return true;
						}
					}

					incompleteRoom = null;
					return false;				
				});
			});
		}

		map[exitCoords[1]][exitCoords[0]]["special"] = "exit";

		return map;
	}
};