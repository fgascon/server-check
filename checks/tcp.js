var net = require('net');
var Q = require('q');

module.exports = function(options){
	if(!options.host){
		return Q.reject(new Error("Host missing"));
	}
	if(!options.port){
		return Q.reject(new Error("Port missing"));
	}
	
	var deferred = Q.defer();
	
	var socket = net.connect(options.port, options.host);
	
	if(options.timeout){
		socket.setTimeout(options.timeout, function(){
			socket.destroy();
			deferred.resolve(false);
		});
	}
	
	socket.on('error', function(err){
		socket.destroy();
		deferred.resolve(false);
	});
	socket.on('connect', function(){
		socket.destroy();
		deferred.resolve(true);
	});
	
	return deferred.promise;
};