//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var formidable = require('formidable');
var validator = require('validator');
var cors = require('cors');
var express = require('express');
var mysql = require('mysql');
var chance = require('chance');

var app = express();
app.use(cors());

var db = mysql.createConnection({
    host: 'localhost',
    // credenciais 1
    user: 'up201200296',
    password: 'segredo'
    
    // credenciais 2
    //user: 'up201202482'
});

db.connect(function(error)  {
    if(error) console.log("Error: "+error);
    
    var query = db.query('USE twdb;', function(err, result) {
        if(err) console.log(err);
    });
});

//chamar modulo crypto para encriptaçao de passwords
var crypto = require('crypto');

function createHash(pass) {
    return crypto.createHash('md5').update('pass').digest('hex');
}

var RSG = new chance();

//register
/*

Para as passwords:
Comparaçao:
"Assim, o valor guardado na coluna pass deve ser uma sequência de dígitos hexadecimais correspondente a um hash MD5 da //concatenação da "pass" com o sal".

Geraçao:
temos de gerar um salt e um hash = pass+salt
o salt sao 4 chars aleatorios, usando modulo chance

Na insercao de novos users na database:
de acordo com a tabela Users : name, pass, salt
*/
app.post('/register', function(request, response) {
    // validator stuff
    var req = formidable.IncomingForm()
    var req_name = req.fields.name;
    var req_pass = req.fields.pass;
    // se o nome for valido -> aqui ainda so se esta a sanitizar o nome
    if(validator.escape(req_name).toString != null){
        //fazer uma query com o nome do pedido
        var query_this = dc.query("select * from Users where name = ?",[name],function(error,answer){
            // error handling
            if(error){
                console.log("Error occurred: "+error);
            }
            // se tivermos uma resposta
            if(answer.length > 0){
                var player = answer[0];
                // agora verificar se a pass esta certa
                // caso afirmativo
                if(createHash(pass+player.salt) == user.pass){
                    // resposta vazia para estar de acordo com a segunda etapa
                    response.json({});
                }
                // se der asneira, responder como manda a segnda etapa
                else{
                    response.json({"error": "User registered with a different password"});
                }
            }
            // se nao obtivermos uma resposta, temos de inserir um novo user na nossa database
            else{
                //criar o salt e a hash
                var player_salt = chance.string({lenght:4});
                var player_hash = createHash(pass + salt);
                //espetar com o novo player na database
                var annex_this = {name: name, pass: player_hash, salt: player_salt};
                //fazer uma query onde se introduz o novo user
                var insert_query =db.query("INSERT INTO Users SET ?",annex_this,function(error, answer){
                    // caso de asneira ao introduzir
                    if(error){
                        console.log("Error: "+error);
                    }
                    //resposta vazia caso contrario
                    response.json({});
                });
            }
        });
    }
    // tudo o que esta acima se o nome de user for valido. se nao for:
    else response.json({error:"Jogador inválido"});
});



//Lets define a port we want to listen to
const PORT=8042; 

//Lets start our server
var server = app.listen(PORT, '0.0.0.0', function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://%s:%s", server.address().address, PORT);
});