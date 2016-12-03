var game_key;
var game_ID;
// while waiting for oponent, this is false, when oponent arrives, this becomes true
var gameIsRunning = false;
var player2;
var turn;
var player1Score;
var player2Score;
var play;
var flag = 0;


function joinGame(){
    getDiff();
    var nome = document.getElementById("id").value.toString();
    var pw = document.getElementById("pw").value.toString();
    var lvl = difficulty.toLowerCase();
    var group = 42;
    var params = JSON.stringify({name: nome, pass: pw, level: lvl, group: group});
    
    //request itself
    var join_req = new XMLHttpRequest();
    join_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8000/join",true);
    join_req.setRequestHeader("Content-type", "application/json"); 
    
    join_req.onreadystatechange = function(){
    
        if(join_req.readyState !== 4){return;}
        
        if(join_req.status !== 200){
            window.alert("Error - Bad Request, error: "+join_req.status+" readystate: "+join_req.readyState);
            return;
        }
        
        var sv_response = JSON.parse(join_req.responseText);
        
        if(sv_response.error !== undefined) {
            alert(sv_response.error);
        }
        
        else {
            game_key = sv_response.key;
            game_ID = sv_response.game;
            console.log(sv_response);
            goToMult();
        }
    }
    
    join_req.send(params);
}// end of join method


function leave() {
    var params = JSON.stringify({
        name: username,
        game: game_ID,
        key: game_key
    });
    
    var leave_req = new XMLHttpRequest();
    leave_req.onreadystatechange = function() {
        
        if(leave_req.readyState !== 4){return;}
        
        if(leave_req.status !== 200){
            window.alert("Error - Bad Request, error: "+leave_req.status+" readystate: "+leave_req.readyState);
            return;
        }
        
        var sv_response = JSON.parse(leave_req.responseText);
    }
    if(gameIsRunning === false){
            leave_req.open("post", "http://twserver.alunos.dcc.fc.up.pt:8000/leave",true);
            leave_req.setRequestHeader("Content-type", "application/json"); 
            leave_req.send(params);
        backFromMP();
    }
    else alert("You can't leave now!");
}// end of leave method

function backFromMP(){
    if(gameIsRunning===false) switchDiv('multiplayer','main_menu');
}// end of backFromMP method

function notify(){
    var o = play.ori;
    var r = play.row;
    var c = play.col;

    if(r%2 === 0 && c%2 === 1) {
        r = 1+r/2;
        c = (c+1)/2;
    }
    else if(r%2 === 1 && c%2 === 0) {
        r = (r+1)/2;
        c = 1+c/2;
    }
    
    var params = JSON.stringify({
        name: username, 
        game: game_ID,
        key: game_key,
        orient: o,
        row: r,
        col: c
    });
    
    var notify_req = new XMLHttpRequest();
    notify_req.open("post", "http://twserver.alunos.dcc.fc.up.pt:8000/notify",true);
    notify_req.setRequestHeader("Content-type", "application/json"); 
    
    notify_req.onreadystatechange = function() {
        
        if(notify_req.readyState !== 4){return;}
        
        if(notify_req.status !== 200){
            window.alert("Error - Bad Request, error: "+notify_req.status+" readystate: "+notify_req.readyState);
            return;
        }
        
        var sv_response = JSON.parse(notify_req.responseText);
        
        if(sv_response.error !== undefined) {
            alert(sv_response.error);
            updateGameState();
        }
        else console.log("jogada valida");
        updateGameState();
    }
    notify_req.send(params);
}// end of notify method

function goToMult() {
    switchDiv('main_menu', 'multiplayer');
    sse = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8000/update?name=" + username + "&game=" + game_ID + "&key=" + game_key);
    sse.onmessage = function(event) {
        var message = JSON.parse(event.data);
        if(message.error === undefined) {
            player2 = message.opponent;
            turn = message.turn;
            
            document.getElementById('multigametable').innerHTML="";
            getDiff();
            
            switch(difficulty){
                case "beginner":
                    createGameTable(2,3,'multigametable');
                    break;
                case "intermediate":
                    createGameTable(4,5,'multigametable');
                    break;
                case "advanced":
                    createGameTable(6,8,'multigametable');
                    break;
                case "expert":
                    createGameTable(9,11,'multigametable');
                    break;
                default:
                    createGameTable(9,11,'multigametable');
                break;
            }
            // 2 players -> build table -> game is running from now on
            gameIsRunning = true;
    
            //timers, player goes first
            resetPlayer1Timer();
            resetPlayer2Timer();
            startDate = new Date();
            startPlayer1Timer();
            
            if(turn === username) {
                document.getElementById('player1').firstChild.nodeValue = username;
                document.getElementById('player2').firstChild.nodeValue = player2;
            }
            else {
                document.getElementById('player1').firstChild.nodeValue = player2;
                document.getElementById('player2').firstChild.nodeValue = username;
            }
                document.getElementById('score3').firstChild.nodeValue = 0;
                document.getElementById('score4').firstChild.nodeValue = 0;
                player1Score = 0;
                player2Score = 0;
            
            $(".hline, .vline").click(function() { 
                play = getCellIndex(this);
                notify();
            });
            updateGameState();
        }   
        
        else alert(message.error);   
    }
}// end of method for 1st iteration of update

// na parte dos winners, falta criar um record e manda-lo pro sv.
// na parte do move, tem que se pintar o que diz na mensagem e fazer a verificação da troca de turno. ou nao, n sei.
function updateGameState() {
    //sse = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8000/update?name=" + username + "&game=" + game_ID + "&key=" + game_key);
    sse.onmessage = function(event){
        var sv_answer = JSON.parse(event.data);
        var table = document.getElementById('multigametable');
        
        if(sv_answer.turn === username) {
            if(sv_answer.move.orient === 'h') {
                $('table tr').eq(2*(sv_answer.move.row-1)).find('td').eq(2*sv_answer.move.col-1).css('background-color', 'red');
            }
            else if(sv_answer.move.orient === 'v') {
                $('table tr').eq(2*sv_answer.move.row-1).find('td').eq(2*(sv_answer.move.col-1)).css('background-color', 'red');
            }
        }
        else if(sv_answer.turn === player2) {
            if(sv_answer.move.orient === 'h') {
                $('table tr').eq(2*(sv_answer.move.row-1)).find('td').eq(2*sv_answer.move.col-1).css('background-color', 'blue');
            }
            else if(sv_answer.move.orient === 'v') {
                $('table tr').eq(2*sv_answer.move.row-1).find('td').eq(2*(sv_answer.move.col-1)).css('background-color', 'blue');
            }
        }
        
        if(sv_answer.move.boxes != undefined) {
            if(sv_answer.turn === username) {
                if(sv_answer.move.boxes.length === 1) {
                    player1Score++;
                    $('table tr').eq(2*sv_answer.move.boxes[0][0]-1).find('td').eq(2*sv_answer.move.boxes[0][1]-1).css('background-color', 'blue');
                }
                else if(sv_answer.move.boxes.length === 2) {
                    player1Score = player1Score+2;
                    $('table tr').eq(2*sv_answer.move.boxes[0][0]-1).find('td').eq(2*sv_answer.move.boxes[0][1]-1).css('background-color', 'blue');
                    $('table tr').eq(2*sv_answer.move.boxes[1][0]-1).find('td').eq(2*sv_answer.move.boxes[1][1]-1).css('background-color', 'blue');
                }          
            }
            else if(sv_answer.turn === player2) {
                if(sv_answer.move.boxes.length === 1) {
                    player2Score++;
                    $('table tr').eq(2*sv_answer.move.boxes[0][0]-1).find('td').eq(2*sv_answer.move.boxes[0][1]-1).css('background-color', 'red');
                }
                else if(sv_answer.move.boxes.length === 2) {
                    player2Score = player2Score+2;
                    $('table tr').eq(2*sv_answer.move.boxes[0][0]-1).find('td').eq(2*sv_answer.move.boxes[0][1]-1).css('background-color', 'red');
                    $('table tr').eq(2*sv_answer.move.boxes[1][0]-1).find('td').eq(2*sv_answer.move.boxes[1][1]-1).css('background-color', 'red');
                }              
            }
            
            if(turn === username) {
                document.getElementById('score3').firstChild.nodeValue = player1Score;
                document.getElementById('score4').firstChild.nodeValue = player2Score;
            }
            else {
                document.getElementById('score3').firstChild.nodeValue = player2Score;
                document.getElementById('score4').firstChild.nodeValue = player1Score;
            }
        }
        else switchTimer();
        
        if(sv_answer.winner != undefined) {
            if(sv_answer.winner === username) {
                alert("gratz u won");
            }
            else if(sv_answer.winner === username && sv_answer.winner === player2) alert("Draw");
            else alert("u succ");
            
            gameIsRunning = false;
            stopPlayer1Timer();
            stopPlayer2Timer(); 
        }
        
        
    }// end of sse
  
}// end of method

//switches which timer is counting
function switchTimer() {
    if(flag === 0) {
        stopPlayer1Timer();
        continuePlayer2Timer();
        flag = 1;
    }
    else if(flag === 1) {
        stopPlayer2Timer();
        continuePlayer1Timer();
        flag = 0;
    }
}

/*function ranking() {
    makeRequest(JSON.stringify({level: "beginner"}));
    makeRequest(JSON.stringify({level: "intermediate"}));
    makeRequest(JSON.stringify({level: "advanced"}));
    makeRequest(JSON.stringify({level: "expert"}));
}
// {name:asndas,joa:oabsdojabs}
function makeRequest(params){
    //var toSend = JSON.parse(params);
    var request = new XMLHttpRequest();
    request.open("post", "http://twserver.alunos.dcc.fc.up.pt:8000/ranking",true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState !== 4){return;}
        if(request.status !== 200){
            window.alert("Error - Bad Request, error: "+request.status+" readystate: "+request.readyState);
            return;
        }  
        var sv_response = JSON.parse(request.responseText);
        
        request.send(params);
        window.alert(sv_response);
    }
    
}// end method*/

function ranking() {
    makeRequest("beginner");
    makeRequest("intermediate");
    makeRequest("advanced");
    makeRequest("expert");
}

function makeRequest(dif) {
    
    var params = JSON.stringify({"level":dif});
    //request itself
    var ranking_req = new XMLHttpRequest();
    ranking_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8000/ranking",true);
    ranking_req.setRequestHeader("Content-type", "application/json"); 
    
    ranking_req.onreadystatechange = function(){
    
        if(ranking_req.readyState !== 4){return;}
        
        if(ranking_req.status !== 200){
            window.alert("Error - Bad Request, error: "+ranking_req.status+" readystate: "+ranking_req.readyState);
            return;
        }
        /*
         case "Beginner":
            SingleBeginner.push(p1);
            SingleBeginner.sort(function(a,b){if(a.pontos === b.pontos) return a.tempo-b.tempo; else return b.pontos - a.pontos;});
            break;
        */
        var sv_response = JSON.parse(ranking_req.responseText);
        // organiza o array da resposta (pontos, caso de empate -> tempo)
        /*sv_response.ranking.sort(function( sv_response[ranking[a]], sv_response[ranking[b]]){
            if( sv_response[ranking[a]].boxes ===  sv_response[ranking[b]].boxes)return  sv_response[ranking[a]].time -  sv_response[ranking[b]].time; 
            else return sv_response[ranking[b]].boxes -  ssv_response[ranking[a]].boxes;}
                                );*/
        sv_response.ranking.sort();
        // escrever na tabela
        switch(dif){
            case "beginner":
                for(var i=0;i<sv_response.ranking.length;i++){
                    $('#m1 tbody tr').eq(i).find('td').eq(0).text(i+1);
                    $('#m1 tbody tr').eq(i).find('td').eq(1).text(sv_response.ranking[i].name);
                    $('#m1 tbody tr').eq(i).find('td').eq(2).text(sv_response.ranking[i].boxes);
                    $('#m1 tbody tr').eq(i).find('td').eq(3).text(sv_response.ranking[i].time);
                }
            break;
            case "intermediate":
                for(var i=0;i<sv_response.ranking.length;i++){
                    $('#m2 tbody tr').eq(i).find('td').eq(0).text(i+1);
                    $('#m2 tbody tr').eq(i).find('td').eq(1).text(sv_response.ranking[i].name);
                    $('#m2 tbody tr').eq(i).find('td').eq(2).text(sv_response.ranking[i].boxes);
                    $('#m2 tbody tr').eq(i).find('td').eq(3).text(sv_response.ranking[i].time);
                }
            break;
            case "advanced":
                for(var i=0;i<sv_response.ranking.length;i++){
                    $('#m3 tbody tr').eq(i).find('td').eq(0).text(i+1);
                    $('#m3 tbody tr').eq(i).find('td').eq(1).text(sv_response.ranking[i].name);
                    $('#m3 tbody tr').eq(i).find('td').eq(2).text(sv_response.ranking[i].boxes);
                    $('#m3 tbody tr').eq(i).find('td').eq(3).text(sv_response.ranking[i].time);
                }
            break;
            case "expert":
                for(var i=0;i<sv_response.ranking.length;i++){
                    $('#m4 tbody tr').eq(i).find('td').eq(0).text(i+1);
                    $('#m4 tbody tr').eq(i).find('td').eq(1).text(sv_response.ranking[i].name);
                    $('#m4 tbody tr').eq(i).find('td').eq(2).text(sv_response.ranking[i].boxes);
                    $('#m4 tbody tr').eq(i).find('td').eq(3).text(sv_response.ranking[i].time);
                }
            break;
            default:
                alert ("Stuff happened!");
                break;
        }
        
        if(sv_response.error !== undefined) {
            alert(sv_response.error);
        }
    }
    
    ranking_req.send(params);
}// end of join method

function updateLeaderBoardsMP(dif){
    switch(dif){
            
    }
}