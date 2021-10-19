'use strict';

//MODEL
var gBoard = [];
var gIsGameOn;
var gNextNumber;
var gNumOfClicks;
var gInterval = null;
const NUM_OF_ITEMS = 16;

function init() {
	console.log('. . . Initialize . . . ');
	gIsGameOn = false;
	gNumOfClicks = 0;
	gNextNumber = 1;
	document.querySelector('.main-content').classList.add('hide');
	document.querySelector('.timer').classList.add('hide');
	document.querySelector('.congrats').classList.add('hide');
	gBoard = shuffle(resetNums(NUM_OF_ITEMS));
	clearTimer();
}

function playGame() {
	var elBtn = document.querySelector('.start-btn');
	if (elBtn.innerText === 'Play Again 🔁') init();
	if (gInterval && !gIsGameOn) gameOver();
	gIsGameOn = !gIsGameOn;
	startTimer();
	elBtn.innerText = gIsGameOn ? 'Stop Game ⬜' : 'Start Game  ▶';
	document.querySelector('.main-content').classList.toggle('hide');
	document.querySelector('.timer').classList.toggle('hide');
	renderBoard();
}

function renderBoard() {
	if (gIsGameOn) {
		var strHTML = '';
		var boardLength = Math.sqrt(gBoard.length);
		for (var i = 0; i < boardLength; i++) {
			strHTML += '<tr>';
			for (var j = 0; j < boardLength; j++) {
				var pos = i * boardLength + j;
				strHTML += `\n<td class="cell" data-value="${gBoard[pos]}" onclick="cellClicked(${gBoard[pos]},this)">${gBoard[pos]}</td>`;
			}
			strHTML += '</tr>\n';
		}
		document.querySelector('.board').innerHTML = strHTML;
	}
}

function cellClicked(cellValue, elCell) {
	gNumOfClicks++;
	if (cellValue === gNextNumber) {
		gNextNumber++;
		var elCell = document.querySelector(`[data-value="${cellValue}"]`);
		elCell.style.background =
			'linear-gradient(to bottom right, #838383, #FFFFFF)';
		if (isVictory()) {
			console.log('User has complete all numbers in board!');
			var elClicksBtn = document.querySelector(`.clicks-count`);
			elClicksBtn.innerText = `You made it with ${gNumOfClicks} clicks!`;
			document.querySelector('.congrats').classList.remove('hide');
			gameOver();
		}
	
	}
}

function isVictory() {
	return gNextNumber === NUM_OF_ITEMS+1;
	
}

function gameOver() {
	console.log('*** GAME OVER ***');
	document.querySelector('.start-btn').innerText = 'Play Again 🔁';
	clearTimer();
	playSound();
	gIsGameOn = false;
}

function playSound() {
	var sound = new Audio('sound/applause.wav');
	sound.play();
}

function showInstructions() {
	alert(
		`Touch the numbers in a sequence from 1 to 16 as fast as you can. \n"Touch the Numbers" is a simple game for training your reflexes and peripheral vision.`
	);
}
