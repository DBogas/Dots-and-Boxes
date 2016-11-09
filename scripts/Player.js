// highscore stuff
var SingleBeginner = new Array();
var SingleIntermedaite = new Array();
var SingleAdvanced = new Array();
var SingleExpert = new Array();

// player object
function NewPlayer(pontos,tempo){
    this.nome = document.getElementById("id").value;
    this.pontos = pontos;
    this.tempo = tempo;
};
// insert player in leaderboard
// insert a player in the singlebeginner array if it can be inserted
function insertPlayer(){
    var pontos = document.getElementById("score1").innerHTML;
    var tempo = currTime.getSeconds();
    var p1 = new NewPlayer(pontos,tempo);
    
    var diff  = document.getElementById("radius");
    for(var i=0;i<diff.length;i++){
        if(diff[i].checked) var opt = diff[i].value;
    }
    
    switch(opt){
        case "Beginner":
            SingleBeginner.push(p1);
            SingleBeginner.sort(function(a,b){if(a.pontos === b.pontos) return a.tempo-b.tempo; else return b.pontos - a.pontos;});
            break;
        case "Intermediate":
            SingleIntermedaite.push(p1);
            SingleIntermedaite.sort(function(a,b){if(a.pontos === b.pontos) return a.tempo-b.tempo; else return b.pontos - a.pontos;});
            break;
        case "Advanced":
            SingleAdvanced.push(p1);
            SingleAdvanced.sort(function(a,b){if(a.pontos === b.pontos) return a.tempo-b.tempo; else return b.pontos - a.pontos;});
            break;
        case "Expert":
            SingleExpert.push(p1);
            SingleExpert.sort(function(a,b){if(a.pontos === b.pontos) return a.tempo-b.tempo; else return b.pontos - a.pontos;});
            break;
        default:
            break;
    }
}

function swag(){
    for(var i=0;i<SingleBeginner.length;i++){
        $('#s1 tbody tr').eq(i).find('td').eq(0).text(i+1);
        $('#s1 tbody tr').eq(i).find('td').eq(1).text(SingleBeginner[i].nome);
        $('#s1 tbody tr').eq(i).find('td').eq(2).text(SingleBeginner[i].pontos);
        $('#s1 tbody tr').eq(i).find('td').eq(3).text(SingleBeginner[i].tempo);
    }
}