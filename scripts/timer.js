//global vars
var startDate;
var PlayerTimer;
var SuperAITimer;
var currTime = 0;
var currTimeAI = 0;
var player1Timer;
var player2Timer;
var currTime1 = 0;
var currTime2 = 0;

// timer constructor
function gameTimer(date, clock) {
	var currentTime = (new Date - date);
	var currentTimeEx = new Date(currentTime);
    if(clock === "clock1") currTime = currentTimeEx;
    else if(clock === "clock2") currTimeAI = currentTimeEx;
    else if(clock === "clock3") currTime1 = currentTimeEx;
    else if(clock === "clock4") currTime2 = currentTimeEx;
    
    
	var currentHours = currentTimeEx.getHours();
	var currentMinutes = currentTimeEx.getMinutes();
	var currentSeconds = currentTimeEx.getSeconds();
	
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
	
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
	
	document.getElementById(clock).firstChild.nodeValue = currentTimeString;
}

// start timer
function startPlayerTimer(){
    PlayerTimer = setInterval(function() {gameTimer(startDate, 'clock1');}, 1000);
}

function startSuperAITimer(){
    var auxDate = new Date();
    SuperAITimer = setInterval(function() {gameTimer(auxDate, 'clock2');}, 1000);
}

function startPlayer1Timer(){
    player1Timer = setInterval(function() {gameTimer(startDate, 'clock3');}, 1000);
}

function startPlayer2Timer(){
    player2Timer = setInterval(function() {gameTimer(startDate, 'clock4');}, 1000);
}

// continue timer
function continuePlayerTimer(){
    startDate = new Date(new Date() - currTime);
    PlayerTimer = setInterval(function() {gameTimer(startDate, 'clock1');}, 1000);
}

function continueSuperAITimer(){
    startDate = new Date(new Date() - currTimeAI);
    SuperAITimer = setInterval(function() {gameTimer(startDate, 'clock2');}, 1000);
}

function continuePlayer1Timer(){
    startDate = new Date(new Date() - currTime1);
    player1Timer = setInterval(function() {gameTimer(startDate, 'clock3');}, 1000);
}

function continuePlayer2Timer(){
    startDate = new Date(new Date() - currTime2);
    player2Timer = setInterval(function() {gameTimer(startDate, 'clock4');}, 1000);
}

// stop timer
function stopPlayerTimer(){
    clearInterval(PlayerTimer);
}

function stopSuperAITimer(){
    clearInterval(SuperAITimer);
}

function stopPlayer1Timer(){
    clearInterval(player1Timer);
}

function stopPlayer2Timer(){
    clearInterval(player2Timer);
}

// reset timer
function resetPlayerTimer(){
    stopPlayerTimer();
    document.getElementById('clock1').firstChild.nodeValue = null;
    currTime = 0;
    PlayerTimer = 0;
}

function resetSuperAITimer(){
    stopSuperAITimer();
    document.getElementById('clock2').firstChild.nodeValue = null;
    currTimeAI = 0;
    SuperAITimer = 0;
}

function resetPlayer1Timer(){
    stopPlayer1Timer();
    document.getElementById('clock3').firstChild.nodeValue = null;
    currTime1 = 0;
    player1Timer = 0;
}

function resetPlayer2Timer(){
    stopPlayer2Timer();
    document.getElementById('clock4').firstChild.nodeValue = null;
    currTime2 = 0;
    player2Timer = 0;
}