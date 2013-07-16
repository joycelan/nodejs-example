
var settings = {
	honpac_name: '',
	honpac_data: '',
	honpac_email: '',
	honpac_title: '',
};

var server = { };

server.getParam = function getParam(key){
	if (!key) {
		var result = [];
		for(var k in settings) {
			result.push(getParam(k));
		}
		return result.join("");
	}
	key = key.toLowerCase();
	if (key in settings) {
		return key + "='" + settings[key] + "'\n";
	}
	return "";
};

server.setParam = function setParam(key, value){
	key = key.toLowerCase();
	if (key in settings) {
		settings[key] = value;
		return "Set " + key + " ok!\n";
	}
 
	return "";
};

module.exports = server;