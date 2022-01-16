var labirynthDrawer = {
	sizeUnit: "px",
	cellSize: 20,
	cellBackground: "lightblue",
	labirynthHolder: undefined,
	setLabirynthHolder: function(mapSize) {
		this.labirynthHolder = document.getElementById("content-holder");

		this.labirynthHolder.style.width = (mapSize * this.cellSize) + this.sizeUnit;
		this.labirynthHolder.style.height = (mapSize * this.cellSize) + this.sizeUnit;
		this.labirynthHolder.style.border = "solid 1px black";
	},

	createCell: function(x,y,mapSize){
		var labirynthCell = document.createElement("div");
		
		if(!this.labirynthHolder){
			this.setLabirynthHolder(mapSize);
		}


		labirynthCell.style.width = this.cellSize + this.sizeUnit;
		labirynthCell.style.height = this.cellSize + this.sizeUnit;
		labirynthCell.style.position = "absolute";
		labirynthCell.style.top = (y * this.cellSize) + this.sizeUnit;
		labirynthCell.style.left = (x * this.cellSize) + this.sizeUnit;
		labirynthCell.style.border = "solid 1px " + this.cellBackground;
		labirynthCell.style.boxSizing = "border-box";
		labirynthCell.style.backgroundColor = this.cellBackground;	

		return this.labirynthHolder.appendChild(labirynthCell);
	},
};