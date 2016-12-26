//Lets require/import the HTTP module
var http = require('http');

var url = require('url');

var formidable = require('formidable');

var validator = require('validator');

var mysql = require('mysql');

//Lets define a port we want to listen to
const PORT=8042; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    if(request.url === '/register' && request.method.toLowerCase() === 'post') {
        var form = new formidable.IncomingForm();
        form.parse(request, function(err, fields){
            
        });
        response.end('It Works!! Path Hit: ' + request.url);
    }
    response.end('it works');
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});