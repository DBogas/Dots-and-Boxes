

// method to create a new single game, still missing timer stuff, add when ready
function startSingleGame(){
    // obtain difficulty
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
    //timers, player goes first
    startDate = new Date();
    startPlayerTimer();
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