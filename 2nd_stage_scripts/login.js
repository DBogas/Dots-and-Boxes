/*
readystate:
0 - not initialized
1 - open
2 - request sent
3 - receiving answer
4 - answer received
*/

function register_me(){
var name = document.getElementById("id").value.toString();
var pass = document.getElementById("pw").value.toString();
var params = "name="+name+"&pass="+pass;
var register_req = new XMLHttpRequest();

register_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8042/register",true);
register_req.setRequestHeader("Content-type", "application/json");

register_req.onreadystatechange = function(){
    // enquanto n receber resposta
    if(register_req.readyState != 4){
        return;
    }
    // tratamento de erros
    if(register_req.status != 200){
        window.alert("Error - Bad Request, error: "+register_req.status+" readystate: "+register_req.readyState);
        return;
    }
    var sv_response = register_req.responseText;
    // fazer malabarismos
    switchDiv('log_in_div','main_menu')
}

register_req.send(params);
}