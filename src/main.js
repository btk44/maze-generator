// start page:
window.onload = function (e){
	var size = 36;
	var entrance = randomizer.getRandomPoint(size/2, "bottom");
	var exit = randomizer.getRandomPoint(size/2, "top");

	exit[0] = exit[0] + size/2;
	exit[1] = exit[1] + size/2;

	labirynthGenerator.generateLabirynth(size, entrance, exit);
};
