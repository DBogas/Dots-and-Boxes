var difficulty;

//div 1 is showing, div 2 is hidden, this method hides 1 and shows 2
function switchDiv(div1, div2){
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
}

//returns diff
function getDiff() {
    var radio = document.getElementById("radius");
    for(var i=0;i<radio.length;i++) {
        if(radio[i].checked){
            difficulty = radio[i].value.toLowerCase();
        }
    }
}

// builds the leader boards on demand
function goToLeaderBoards(){
    switchDiv('main_menu','leaderboards');
    createLeaderboards();
}

// 
function createLeaderboards() {
	
	var tables = document.getElementsByClassName('leaderboard');
	
	for(var i = 0; i < tables.length; i++){
		tables[i].innerHTML = "";
	}
	
    createTable(10,4,'s1');
    createTable(10,4,'s2');
    createTable(10,4,'s3');
    createTable(10,4,'s4');
    createTable(10,4,'m1');
    createTable(10,4,'m2');
    createTable(10,4,'m3');
    createTable(10,4,'m4');
	
	//table header
	var leaderboardTable = document.getElementsByClassName("leaderboard");
	for(var i = 0; i < leaderboardTable.length; i++){
	var leaderboardHead = leaderboardTable[i].createTHead();
	var row = leaderboardHead.insertRow(0);
	var cell = row.insertCell(0);
	cell.innerHTML = "Pos";
    cell.className = "cell1";
	var cell = row.insertCell(1);
	cell.innerHTML = "Nome";
    cell.className = "cell2";
	var cell = row.insertCell(2);
	cell.innerHTML = "Pontos";
    cell.className = "cell34";
	var cell = row.insertCell(3);
	cell.innerHTML = "Tempo";
    cell.className="cell34";
	}
    updateLeaderBoards();
}