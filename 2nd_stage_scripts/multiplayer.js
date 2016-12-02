var game_key;
var game_ID;
// while waiting for oponent, this is false, when oponent arrives, this becomes true
var gameIsRunning = false;
var player2;
var turn;
var player1Score;
var player2Score;

function joinGame(){
    getDiff();
    var nome = document.getElementById("id").value.toString();
    var pw = document.getElementById("pw").value.toString();
    var lvl = difficulty.toLowerCase();
    var group = 42;
    var params = JSON.stringify({name: nome, pass: pw, level: lvl, group: group});
    
    //request itself
    var join_req = new XMLHttpRequest();
    
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
    
    join_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8000/join",true);
    join_req.setRequestHeader("Content-type", "application/json"); 
    join_req.send(params);
}// end of method

//only possible of still waiting for an oponent
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
    else alert("LUL");
}

function backFromMP(){
    if(gameIsRunning===false) switchDiv('multiplayer','main_menu');
}

function notify(){
    var o = play.ori;
    var r = play.row;
    var c = play.col;
    var params = JSON.stringify({
        name: username, 
        game: game_ID,
        key: game_key,
        orient: o,
        row: r,
        col: c
    });
    
    var notify_req = new XMLHttpRequest();
    
    notify_req.onreadystatechange = function() {
        
        if(notify_req.readyState !== 4){return;}
        
        if(notify_req.status !== 200){
            window.alert("Error - Bad Request, error: "+notify_req.status+" readystate: "+notify_req.readyState);
            return;
        }
        
        var sv_response = JSON.parse(notify_req.responseText);
        
        if(sv_response.error !== undefined) {
            alert(sv_response.error);
            return false;
        }

        return true;
    }
}

function goToMult() {
    switchDiv('main_menu', 'multiplayer');
    sse = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8000/update?name=" + username + "&game=" + game_ID + "&key=" + game_key);
    sse.onmessage = function(event) {
        var message = JSON.parse(event.data);
        if(message.error === undefined) {
            player2 = message.opponent;
            turn = message.turn;
            //reset the table.
            document.getElementById('multigametable').innerHTML="";
            //build according to difficulty.
            
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
            
            gameIsRunning = true;
    
    //timers, player goes first
    resetPlayer1Timer();
    resetPlayer2Timer();
    startDate = new Date();
            
            if(turn === username) {
    startPlayer1Timer();
    
    document.getElementById('player1').firstChild.nodeValue = username;
    document.getElementById('player2').firstChild.nodeValue = player2;
    document.getElementById('score3').firstChild.nodeValue = 0;
    document.getElementById('score4').firstChild.nodeValue = 0;
    player1Score = 0;
    player2Score = 0;
        }
            else {
                startPlayer2Timer();
    
    document.getElementById('player1').firstChild.nodeValue = username;
    document.getElementById('player2').firstChild.nodeValue = player2;
    document.getElementById('score3').firstChild.nodeValue = 0;
    document.getElementById('score4').firstChild.nodeValue = 0;
    player1Score = 0;
    player2Score = 0;
            }
        }
        
        else alert(message.error);
    }
    updateGameState();
}

function updateGameState() {
    
}

function ranking() {
    makeRequest(JSON.stringify({level: "beginner"}),"ranking");
    makeRequest(JSON.stringify({level: "intermediate"}),"ranking");
    makeRequest(JSON.stringify({level: "advanced"}),"ranking");
    makeRequest(JSON.stringify({level: "expert"}),"ranking");
}
// {name:asndas,joa:oabsdojabs}
function makeRequest(params,afterbar){
    var toSend = JSON.parse(params);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState !== 4){return;}
        if(request.status !== 200){
            window.alert("Error - Bad Request, error: "+request.status+" readystate: "+request.readyState);
            return;
        }  
        var sv_response = JSON.parse(request.responseText);
        
        request.open("post", "http://twserver.alunos.dcc.fc.up.pt:8000/"+afterbar,true);
        request.setRequestHeader("Content-type", "application/json"); 
        request.send(toSend);
        window.alert(sv_response);
    }
    
}// end method