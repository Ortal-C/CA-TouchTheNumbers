function resetNums(range) {
	var arr = [];
	for (var i = 1; i <= range; i++) arr.push(i);
	return arr;
}

function shuffle(items) {
	var rndIdx, keep;
	for (var i = items.length - 1; i > 0; i--) {
		rndIdx = getRandomInt(1, items.length - 1);
		//swapping
		keep = items[i];
		items[i] = items[rndIdx];
		items[rndIdx] = keep;
	}
	return items;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function startTimer() {
	if (gIsGameOn){
		var elStopper = document.querySelector('.timer');
		var startTime = Date.now();
		gInterval = setInterval(() => {
			var currTime = ((Date.now() - startTime) / 1000).toFixed(3);
			elStopper.innerHTML = currTime;
		}, 100);
	}		
}

function clearTimer(){
	clearInterval(gInterval);
	gInterval = null;
}

