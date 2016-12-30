//Lets require/import the HTTP module
var http = require('http');

var url = require('url');

var formidable = require('formidable');

var validator = require('validator');

var cors = require('cors');
var express = require('express');

var app = express();
app.use(cors());

var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'up201200296',
    password: 'segredo',
});

db.connect(function(err)  {
    if(err) console.log(err);
    
    var query = db.query('USE twdb;', function(err, result) {
        if(err) console.log(err);
    });
});

//chamar modulo crypto para encriptaçao de passwords
var crypto = require('crypto');

function createHash(pass) {
    return crypto.createHash('md5').update('pass').digest('hex');
}

var chance = require('chance');
var RSG = new chance();

//register
app.post('/register', function(request, response) {
})

//Lets define a port we want to listen to
const PORT=8042; 

//Lets start our server
var server = app.listen(PORT, '0.0.0.0', function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://%s:%s", server.address().address, PORT);
});