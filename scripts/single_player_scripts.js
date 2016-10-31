// method to create a new single game, still missing timer stuff, add when ready
function startSingleGame(){
    var radio = document.getElementById("radius");
    for(var i=0;i<radio.length;i++){
        if(radio[i].checked){
            var diffsetting = radio[i].value;
        }
    }
    //reset the table.
    document.getElementById('singlegametable').innerHTML="";
    //build according to difficulty.
    switch(diffsetting){
        case "Beginner":
            createTable(2,3,'singlegametable');
            break;
        case "Intermediate":
            createTable(4,5,'singlegametable');
            break;
        case "Advanced":
            createTable(6,8,'singlegametable');
            break;
        case "Expert":
            createTable(9,11,'singlegametable');
            break;
        default:
             createTable(9,11,'singlegametable');
            break;
    }
    //start timer
	var start = new Date();
	
    setInterval(function() {
		gameTimer(start);}, 1000);
}

//timer
function gameTimer(date){
	var currentTime = (new Date - date);
	var currentTimeEx = new Date(currentTime);
	
	var currentHours = currentTimeEx.getHours();
	var currentMinutes = currentTimeEx.getMinutes();
	var currentSeconds = currentTimeEx.getSeconds();
	
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
	
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
	
	document.getElementById("clock1").firstChild.nodeValue = currentTimeString;
	document.getElementById("clock2").firstChild.nodeValue = currentTimeString;	
}

// function to create a table (dinamically), given the dificulty

function createTable(gameHeight,gameWidth,tableID){
    
    var gametable = document.getElementById(tableID);
    var tablebody = document.createElement('tbody');
    
    for(var i=0; i<gameHeight; i++){
        var row = document.createElement('tr');
        for(var j=0; j<gameWidth ;j++){
            var cell = document.createElement('td');
            cell.innerHTML = "-";
            cell.className = "cell";
            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }
    gametable.appendChild(tablebody);
}