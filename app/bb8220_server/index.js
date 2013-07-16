var express = require('express'),
	http = require('http'),
	path = require('path'),
	server = require('./server.js'),
	writer = require( './write' );
	app = express();

app.use(express.favicon());
app.use(express.logger('tiny'));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler());

app.get('/cgi-bin/admin/getparam.cgi', function(req, res){
	var k;
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!query get: ' + JSON.stringify(req.query));
	for(k in req.query) {
		res.write(server.getParam(k));
	}
	if(k) {
		res.end();
		return;
	}

	res.end(server.getParam());
});

app.get('/cgi-bin/admin/setparam.cgi', function(req, res){
	var k;

	for(k in req.query) {
		res.write(server.setParam(k, req.query[k]))
	}
	if(k) {
		res.end();
		return;
	}
  
	res.end(server.setParam());
});

app.get('/cgi-bin/admin/camera_update.cgi', function(req, res){
	var k;
	var camera_index;
	for(k in req.query){
		if (k == 'camera') 
		{
			camera_index = req.query[k];
			continue;
		}
		res.write(server.setParam('camera_c' + camera_index + '_' + k, req.query[k]))
	}
	if(k) {
		res.end();
		return;
	}

	res.end(server.setParam());
});

app.get('/cgi-bin/admin/camera_delete.cgi', function(req, res){
	var k;
	var camera_index = 'none';

	for(k in req.query)
	{
		if (k == 'camera')
		{
			camera_index = req.query[k];
			res.write(server.server.setParam('camera_c' + camera_index + '_ip', ''));
			res.write(server.server.setParam('camera_c' + camera_index + '_port', '80'));
			res.write(server.server.setParam('camera_c' + camera_index + '_username', ''));
			res.write(server.server.setParam('camera_c' + camera_index + '_passwd', ''));
		}
		if (k == 'removedata')
		{
			if (camera_index == 'none') return;
			if (req.query[k] == 'yes')
			{
				//camera removedata process
				return 'camera ' + camera_index +  ' removedata done!\n';
			}
		}
	}

	if(k) {
		res.end();
		return;
	}

	res.end(server.setParam());
});

app.get('/cgi-bin/admin/volume_create.cgi', function(req, res){
	var k;
	var bCreateVolume0 = false;
	var bCreateVolume1 = false;

	for(k in req.query)
	{
		switch (k)
		{
			case ('disk1'):
				if (req.query[k] == '0') 
				{
					bCreateVolume0 = true;
					res.write(server.setParam('storage_volume_v0_disk', k));
				}
				if (req.query[k] == '1')
				{
					bCreateVolume1 = true;
					res.write(server.setParam('storage_volume_v1_disk', k));
				}
				break;
			case ('disk2'):
				if (req.query[k] == '0')
				{ 
					bCreateVolume0 = true;
					res.write(server.setParam('storage_volume_v0_disk', k));
				}
				if (req.query[k] == '1')
				{
					bCreateVolume1 = true;
					res.write(server.setParam('storage_volume_v1_disk', k));
				}
				break;
			case ('type'):
				if (req.query[k] == 'single')
				{
					if (bCreateVolume0 == true) res.write(server.setParam('storage_volume_v0_type', req.query[k]));
					if (bCreateVolume1 == true) res.write(server.setParam('storage_volume_v1_type', req.query[k]));
				}
				if (req.query[k] == 'raid_1')
				{
					res.write(server.setParam('storage_volume_v0_disk', 'disk1, disk2'));
					res.write(server.setParam('storage_volume_v1_disk', ''));
					res.write(server.setParam('storage_volume_v0_type', req.query[k]));
					res.write(server.setParam('storage_volume_v1_type', ''));
				}
				break;
			default:
				return 'volume_create.cgi ERROR!!!\n';
		}
	}

	if(k) {
		res.end();
		return;
	}

	res.end(server.setParam());
});

app.get('/cgi-bin/admin/v.cgi', function(req, res){
	var k;

	for(k in req.query)
	{
		if (k == 'volume')
		{
			res.write(server.setParam('storage_volume_v' + req.query[k] + '_status', ''));
			res.write(server.setParam('storage_volume_v' + req.query[k] + '_type', ''));
			res.write(server.setParam('storage_volume_v' + req.query[k] + '_disk', ''));
			res.write(server.setParam('storage_volume_v' + req.query[k] + '_totalsize', ''));
			res.write(server.setParam('storage_volume_v' + req.query[k] + '_availablesize', ''));
		}
	}

	if(k) {
		res.end();
		return;
	}

	res.end(server.setParam());
});

app.get('/cgi-bin/admin/volume_delete.cgi', function(req, res){
	var k;
	console.log('ddddddddddddd');
	for(k in req.query)	{
		switch (k) {
			case ('name'):
					res.write(server.setParam('honpac_name', req.query[k]));
				break;
			case ('data'):
					res.write(server.setParam('honpac_data', req.query[k]));
				break;
			case ('email'):
					res.write(server.setParam('honpac_email', req.query[k]));
				break;
			case ('title'):
					res.write(server.setParam('honpac_title', req.query[k]));
				break;
			default:
				return 'honpac.cgi ERROR!!!\n';
		}
	}

	if(k) {
		res.end();
		return;
	}
	writer.write( './changed.txt', '123' );
	res.end(server.setParam());
});

module.exports = app;