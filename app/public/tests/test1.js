(function(){

var simpleParamParser = function(lines){
	var settings = {};
	lines.split("\n").forEach(function(l, i){
		if(!l) return;
		expect(l).to.contain('=');
		l = l.split("=");
		settings[l[0]] = l[1].slice(1, -1);
	});
	return settings;
};

var str_GetParam = '/cgi-bin/admin/getparam.cgi';
var str_SetParam = '/cgi-bin/admin/setparam.cgi';
var str_camera_updateParam = '/cgi-bin/admin/camera_update.cgi';

describe("Set/Get Params", function(){
	this.timeout(20000);
	it("should response to /cgi-bin/admin/getparam.cgi", function(done){
		$.get(str_GetParam).done(function(lines){
			var settings = simpleParamParser(lines);
			expect(settings.system_daylight_enable).to.be.eql('0');
			expect(settings.system_ntp).to.be.equal('');
			expect(settings.system_updateinterval).to.be.eql('0');
			done();
		}).fail(function(jqxhr, status){
			expect().fail("getparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/getparam.cgi with multiple given key", function(done){
		$.get(str_GetParam + '?system_daylight_enable&system_ntp').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(2);
			expect(settings.system_daylight_enable).to.be('0');
			expect(settings.system_ntp).to.be('');
			done();
		}).fail(function(jqxhr, status){
			expect().fail("getparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/getparam.cgi with multiple given key", function(done){
		$.get(str_GetParam + '?system_daylight_enable&system_ntp&system_updateinterval').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(3);
			expect(settings.system_daylight_enable).to.be('0');
			expect(settings.system_ntp).to.be('');
			expect(settings.system_updateinterval).to.be('0');
			done();
		}).fail(function(jqxhr, status){
			expect().fail("getparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/setparam.cgi with one given key", function(done){
		$.get(str_SetParam + '?networkhttp_alternateport=555').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(1);
			expect(settings.networkhttp_alternateport).to.be('555');
			done();
		}).fail(function(jqxhr, status){
			expect().fail("setparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/getparam.cgi with one given key, and check result after setparam.cgi", function(done){
		$.get(str_GetParam + '?networkhttp_alternateport').done(function(lines){
			var settings = simpleParamParser(lines);
			expect(settings.networkhttp_alternateport).to.be('555');
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			for(var i = 0; i < settings.length; ++i) {

			}
			expect(count).to.be.eql(1);
			done();
		}).fail(function(jqxhr, status){
			expect().fail("getparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/setparam.cgi with multiple given key", function(done){
		$.get(str_SetParam + '?networkhttp_port=1943&networkhttp_authmode=digest').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(2);
			expect(settings.networkhttp_port).to.be('1943');
			expect(settings.networkhttp_authmode).to.be('digest');
			done();
		}).fail(function(jqxhr, status){
			expect().fail("setparam.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/camera_update.cgi with multiple given key", function(done){
		$.get(str_camera_updateParam + '?camera=0&ip=172.18.80.62&port=9999&username=root&passwd=nvradmin').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(4);
			expect(settings.camera_0_ip).to.be('172.18.80.62');
			expect(settings.camera_0_port).to.be('9999');
			expect(settings.camera_0_username).to.be('root');
			expect(settings.camera_0_passwd).to.be('nvradmin')
			done();
		}).fail(function(jqxhr, status){
			expect().fail("camera_update.cgi failed!? status: " + jqxhr.status);
		});
	});
	it("should response to /cgi-bin/admin/getparam.cgi with multiple given key, and check result after camera_update.cgi", function(done){
		$.get(str_GetParam + '?camera_0_ip&camera_0_port&camera_0_username&camera_0_passwd').done(function(lines){
			var settings = simpleParamParser(lines);
			var count = 0;
			for (var k in settings) {
				count += 1;
			}
			expect(count).to.be.eql(4);
			expect(settings.camera_0_ip).to.be('172.18.80.62');
			expect(settings.camera_0_port).to.be('9999');
			expect(settings.camera_0_username).to.be('root');
			expect(settings.camera_0_passwd).to.be('nvradmin')
			done();
		}).fail(function(jqxhr, status){
			expect().fail("camera_update.cgi failed!? status: " + jqxhr.status);
		});
	});


});

})();