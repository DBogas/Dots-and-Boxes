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
            createGameTable(2,3,'singlegametable');
            break;
        case "Intermediate":
            createGameTable(4,5,'singlegametable');
            break;
        case "Advanced":
            createGameTable(6,8,'singlegametable');
            break;
        case "Expert":
            createGameTable(9,11,'singlegametable');
            break;
        default:
             createGameTable(9,11,'singlegametable');
            break;
    }
    //timers, player goes first
    resetPlayerTimer();
    startDate = new Date();
    startPlayerTimer();
}


// function to create a table (dinamically), given the dificulty
/* 
    for each dimension , multiply by (2n+1)
*/

function createGameTable(gh,gw,tid){
    var gametable = document.getElementById(tid);
    var tablebody = document.createElement('tbody');
    for(var i=0; i<2*gh+1;i++){
        var row = document.createElement('tr');
        for(var j=0; j<2*gw+1;j++){
            var cell = document.createElement('td');
            if(i%2==0 && j%2==0) cell.className = "dot";
            else if (i%2==0 && j%2!=0)cell.className ="hline";
            else if (i%2!=0 && j%2==0)cell.className ="vline";
            
            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }
    gametable.appendChild(tablebody);
}
//leaderboards
function createTable(gameHeight,gameWidth,tableID){
    
    var gametable = document.getElementById(tableID);
    var tablebody = document.createElement('tbody');
    
    for(var i=0; i<gameHeight; i++){
        var row = document.createElement('tr');
        for(var j=0; j<gameWidth ;j++){
            var cell = document.createElement('td');
            //cell.innerHTML = "-";
            cell.className = "cell";
            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }
    gametable.appendChild(tablebody);
}

// takes us back to the main mnu from the single player 
function exitGame(){
    // switch div
    switchDiv('singleplayer','main_menu');
    // destroy table
    document.getElementById("singlegametable").innerHTML="";
    //reset timers
    resetPlayerTimer();
    resetSuperAITimer();
}
