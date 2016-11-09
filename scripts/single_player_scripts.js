//flags
var flag;
var playerScore;
var AIScore;
var full;
var gameOver;

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
    
    document.getElementById('score1').firstChild.nodeValue = 0;
    document.getElementById('score2').firstChild.nodeValue = 0;
    playerScore = 0;
    AIScore = 0;
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
    
    if(flag === 'player1') {
        $(".hline, .vline").click(function() { 
            var play = getCellIndex(this);
            if(!checkSquares(play.row, play.col)) {
                switchPlayer(flag);
                AIPlay();
            }
            else flag = 'player1';
            updateScore();
            if(checkTable()) {
                finishGame();
            }
            
        });
    };
}

//AI play
function AIPlay() {
    var table = document.getElementById('singlegametable');
    var row = Math.floor((Math.random() * table.rows.length));
    var col = Math.floor((Math.random() * table.rows[0].cells.length));
    if($('table tr').eq(row).find('td').eq(col).hasClass('hline') || $('table tr').eq(row).find('td').eq(col).hasClass('vline')) {
        if(!$('table tr').eq(row).find('td').eq(col).hasClass('clicked')) {
            $('table tr').eq(row).find('td').eq(col).css('background-color', 'red');
            $('table tr').eq(row).find('td').eq(col).addClass('clicked');
            if(checkSquares(row, col)) {
                updateScore();
                if(checkTable()) {
                finishGame();
            }   
                AIPlay();
            }
            else switchPlayer(flag);
            
            
            /*return {
                row: row,
                col: col
            };*/
        }
        else {
            return AIPlay();
        }
    }
    else {
        return AIPlay();
    }
}


//switches player
function switchPlayer(turn) {
    if(flag === 'AI') {
        flag = 'player1';
        changeColor(flag);
        stopSuperAITimer();
        continuePlayerTimer();
    }
    else if(flag === 'player1') {
        flag = 'AI';
        changeColor(flag);
        stopPlayerTimer();
        continueSuperAITimer();
    }
}

//retorn indice da celula clicada
function getCellIndex(cell) {
        var col = $(cell).parent().children().index($(cell));
        var row = $(cell).parent().parent().children().index($(cell).parent());
        return {
            row: row,
            col: col
        };
}

//verificar se ha quadrados completados, atribuir pontos
function checkSquares(r, c) {
    var table = document.getElementById('singlegametable');
    if(c === 0) {
        if($('table tr').eq(r).find('td').eq(c+2).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c+1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c+1).hasClass('clicked')) {
            switch(flag) {
                case 'player1':
                    $('table tr').eq(r).find('td').eq(c+1).css('background-color', 'blue');
                    playerScore++;
                    return true;
                    break;
                case 'AI':
                    $('table tr').eq(r).find('td').eq(c+1).css('background-color', 'red');
                    AIScore++;
                    return true;
                    break;
                default:
                    return true;
                    break;
            }
        }
        else return false;
    }
    else if(c === table.rows[0].cells.length-1) {
        if($('table tr').eq(r).find('td').eq(c-2).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c-1).hasClass('clicked')) {
            switch(flag) {
                case 'player1':
                    $('table tr').eq(r).find('td').eq(c-1).css('background-color', 'blue');
                    playerScore++;
                    return true;
                    break;
                case 'AI':
                    $('table tr').eq(r).find('td').eq(c-1).css('background-color', 'red');
                    AIScore++;
                    return true;
                    break;
                default:
                    return true;
                    break;
            }
        }
        else return false;
    }
    else if(r === table.rows.length-1) {
        if($('table tr').eq(r-2).find('td').eq(c).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c+1).hasClass('clicked')) {
            switch(flag) {
                case 'player1':
                    $('table tr').eq(r-1).find('td').eq(c).css('background-color', 'blue');
                    playerScore++;
                    return true;
                    break;
                case 'AI':
                    $('table tr').eq(r-1).find('td').eq(c).css('background-color', 'red');
                    AIScore++;
                    return true;
                    break;
                default:
                    return true;
                    break;
            }
        }
        else return false;
    }
    else if(r === 0) {
        if($('table tr').eq(r+2).find('td').eq(c).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c+1).hasClass('clicked')) {
           switch(flag) {
                case 'player1':
                    $('table tr').eq(r+1).find('td').eq(c).css('background-color', 'blue');
                    playerScore++;
                   return true;
                    break;
                case 'AI':
                    $('table tr').eq(r+1).find('td').eq(c).css('background-color', 'red');
                    AIScore++;
                   return true;
                    break;
                default:
                   return true;
                    break;
            }
        }
        else return false;
    }
    else {
        if($('table tr').eq(r).find('td').eq(c).hasClass('hline')) {
            if($('table tr').eq(r-2).find('td').eq(c).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c+1).hasClass('clicked')) {
                switch(flag) {
                case 'player1':
                    $('table tr').eq(r-1).find('td').eq(c).css('background-color', 'blue');
                    playerScore++;
                    break;
                case 'AI':
                    $('table tr').eq(r-1).find('td').eq(c).css('background-color', 'red');
                    AIScore++;
                    break;
                default:
                    break;
            }
            }
            if($('table tr').eq(r+2).find('td').eq(c).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c+1).hasClass('clicked')) {
                switch(flag) {
                case 'player1':
                    $('table tr').eq(r+1).find('td').eq(c).css('background-color', 'blue');
                    playerScore++;
                        return true;
                    break;
                case 'AI':
                    $('table tr').eq(r+1).find('td').eq(c).css('background-color', 'red');
                    AIScore++;
                        return true;
                    break;
                        return true;
                default:
                    break;
            }
            }
            else return false;
        }
        else if($('table tr').eq(r).find('td').eq(c).hasClass('vline')) {
            if($('table tr').eq(r).find('td').eq(c+2).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c+1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c+1).hasClass('clicked')) {
                switch(flag) {
                case 'player1':
                    $('table tr').eq(r).find('td').eq(c+1).css('background-color', 'blue');
                    playerScore++;
                    break;
                case 'AI':
                    $('table tr').eq(r).find('td').eq(c+1).css('background-color', 'red');
                    AIScore++;
                    break;
                default:
                    break;
            }
            }
            if($('table tr').eq(r).find('td').eq(c-2).hasClass('clicked') && $('table tr').eq(r-1).find('td').eq(c-1).hasClass('clicked') && $('table tr').eq(r+1).find('td').eq(c-1).hasClass('clicked')) {
                switch(flag) {
                case 'player1':
                    $('table tr').eq(r).find('td').eq(c-1).css('background-color', 'blue');
                    playerScore++;
                        return true;
                    break;
                case 'AI':
                    $('table tr').eq(r).find('td').eq(c-1).css('background-color', 'red');
                    AIScore++;
                        return true;
                    break;
                default:
                        return true;
                    break;
            }
            }
            else return false;
        }
    }
}
        
//verifica se tabela esta preenchida
function checkTable() {   
    $(".hline, .vline").each(function(index){
        if($(this).hasClass('clicked')){
            full = true;
        }
        else{
            full = false;
            return false;
        }
    });
    return full;
}

//change player, mark cell as cliked
function changeColor(turn){
    if(turn === 'player1'){           
        $(".hline, .vline").click(function() {
            $(this).css('background-color', 'blue');
            $(this).addClass('clicked');
        });
        //flag = 'AI';
    }
    else if(turn === 'AI'){
        $(".hline, .vline").click(function() {
            $(this).css('background-color', 'red');
            $(this).addClass('clicked');
        });
        //flag = 'player1';
    }
}

//finalizar o jogo
function finishGame() {
    stopPlayerTimer();
    stopSuperAITimer();
    insertPlayer();
    if(playerScore > AIScore){
        alert("You: " + playerScore + "AI: " + AIScore + " " + "You Win");
    }
    else if(AIScore > playerScore) {
        alert("You: " + playerScore + "AI: " + AIScore + " " + "You Lose");
    }
    else {
        alert("You: " + playerScore + "AI: " + AIScore + " " + "It's a Draw");
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
    document.getElementById('score1').firstChild.nodeValue = 0;
    document.getElementById('score2').firstChild.nodeValue = 0;
}

function updateScore() {
    /*if(playerScore > player) {
        playerScore = player;
    }
    if(AIScore > AI) {
        AIScore = AI;
    }*/
    document.getElementById('score1').firstChild.nodeValue = playerScore;
    document.getElementById('score2').firstChild.nodeValue = AIScore;
}