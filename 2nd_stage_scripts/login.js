var username;
var password;

function registerMe(){

username = document.getElementById("id").value.toString();
password = document.getElementById("pw").value.toString();
var params = JSON.stringify({name: username , pass: password});
var register_req = new XMLHttpRequest();

//register_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8042/register",true);
register_req.open("post","http://twserver.alunos.dcc.fc.up.pt:8042/register",true);
register_req.setRequestHeader("Content-type", "application/json");

register_req.onreadystatechange = function(){
    if(register_req.readyState !== 4){
        return;
    }
    if(register_req.status !== 200){
        window.alert("Error - Bad Request, error: "+register_req.status+" readystate: "+register_req.readyState);
        return;
    }
    var sv_response = register_req.responseText;
    if(sv_response === "{}") switchDiv('log_in_div','main_menu');
    else window.alert("Error: "+sv_response);
}
    register_req.send(params);
}