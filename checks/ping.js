var spawn = require('child_process').spawn;
var Q = require('q');

var PING_BIN = '/bin/ping';

module.exports = function(options){
	var timeout = options.timeout || 3;
	var triesLeft = options.tries || 1;
	var host = options.host;
	
	if(!host){
		return Q.reject(new Error("Host missing"));
	}
	var args = ['-nq', '-c1', '-w'+timeout, host];
	
	function ping(){
		var deferred = Q.defer();
		var cp = spawn(PING_BIN, args);
		
		cp.on('error', deferred.reject);
		cp.on('exit', function(code){
			deferred.resolve(code === 0);
		});
		
		return deferred.promise;
	}
	
	function next(){
		return ping().then(function(result){
			if(result){
				return true;
			}else if(--triesLeft <= 0){
				return false;
			}else{
				return next();
			}
		});
	}
	
	return next();
};