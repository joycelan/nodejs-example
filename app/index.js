var express = require('express'),
	http = require('http'),
	path = require('path'),
	server = require('./server.js'),
	writer = require( './write.js' );
	app = express();
app.use(express.favicon());
app.use(express.logger('tiny'));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler());
   
app.post('/cgi-bin/admin/honpac.cgi', function(req, res){

var result='';
	var k;
	console.log(req.body);
	k= JSON.stringify( req.body);
	var date = new Date();
	var time = date.getTime();
	writer.write( './message/'+req.body.title+' - '+ time +'.txt', k );
});

module.exports = app;