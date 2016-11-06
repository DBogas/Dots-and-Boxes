//flags
var flag;

// method to create a new single game, still missing timer stuff, add when ready
function startSingleGame() {
    // obtain difficulty
    var radio = document.getElementById("radius");
    for(var i=0;i<radio.length;i++) {
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
    resetSuperAITimer();
    startDate = new Date();
    startPlayerTimer();
    
    actualGameBeta();
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
            else cell.className = "square";
            
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

//Dots-and-Boxes v0.0.1
function actualGameBeta() {
    flag = 'player1';
    changeColor(flag);
    //getCellIndex();
    
    if(flag === 'player1'){
        $(".hline, .vline").click(function() {
            switchPlayer(flag);
            var play = getCellIndex(this);
            checkSquares(play.row, play.col);
        });
    }
    else if(flag === 'AI'){
        $(".hline, .vline").click(function() {
            switchPlayer(flag);
            var play = getCellIndex(this);
            checkSquares(play.row, play.col);
        });
    }
}


//switches player
function switchPlayer(turn) {
    if(flag === 'AI') {
        changeColor(flag);
        stopPlayerTimer();
        continueSuperAITimer();
    }
    else if(flag === 'player1') {
        changeColor(flag);
        stopSuperAITimer();
        continuePlayerTimer();
    }
}

//retorn indice da celula clicada
function getCellIndex(cell) {
        var col = $(cell).parent().children().index($(cell));
        var row = $(cell).parent().parent().children().index($(cell).parent());
        //alert('Row: ' + row + ', Column: ' + col);
        return {
            row: row,
            col: col
        };
}

//verificar se ha quadrados completados
function checkSquares(r, c) {
    var table = document.getElementById('singlegametable');
    if(c === 0) {
        if($('table tr').eq(r).find('td').eq(c+2).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c+1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c+1).hasClass('clicked')) {
            $('table tr').eq(r).find('td').eq(c+1).css('background-color', 'yellow');
            alert('SQUARED');
        }
    }
    /*else if(c === table.rows[0].cells.length) {}
    else if(r === table.rows.length) {}
    else if(r === 0) {}
    else {}*/
}
        
//verifica se tabela esta preenchida
function checkTable() {
    $(".hline, .vline").each(function(index){
        if($(this).css.background != 'blue'){
            console.log('Empty');
            return true;
        }
    });
}

//change background on click
function changeColor(turn){
    if(turn === 'player1'){           
        $(".hline, .vline").click(function() {
            $(this).css('background-color', 'blue');
            $(this).addClass('clicked');
        });
        flag = 'AI';
    }
    else if(turn === 'AI'){
        $(".hline, .vline").click(function() {
            $(this).css('background-color', 'red');
            $(this).addClass('clicked');
        });
        flag = 'player1';
    }
}

// takes us back to the main menu from the single player 
function exitGame(){
    // switch div
    switchDiv('singleplayer','main_menu');
    // destroy table
    document.getElementById("singlegametable").innerHTML="";
    //reset timers
    resetPlayerTimer();
    resetSuperAITimer();
}
