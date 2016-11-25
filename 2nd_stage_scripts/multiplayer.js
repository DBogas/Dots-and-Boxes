// exemplo de objecto a enviar {"name": "rprior", "pass": "segredo", "level": "beginner", "group": 7}
// exemplo de objecto a receber {"game": 12345, "key": "98ae5aa10c051988759ae743b607ce21"} 
// devolve os parâmetro game e key para usar na invocação das outras funções
function joinGame(){
    // this is to get the difficulty
    var radio = document.getElementById("radius");
    for(var i=0;i<radio.length;i++) {
        if(radio[i].checked){
            var diffsetting = radio[i].value;
        }
    }
    //vars
    var nome = document.getElementById("id").value.toString();
    var pw = document.getElementById("pw").value.toString();
    var lvl = diffsetting.toString();
    var group = 42;
    var params = JSON.stringify({"name": nome, "pass": pw, "level": lvl, "group": group});
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
        
        var sv_response = join_req.responseText;
        else window.alert("Error: "+sv_response+" Status: "+join_req.status);
    }
    join_req.send(params);
}// end of method
    
