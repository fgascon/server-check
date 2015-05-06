var request = require('request');
var Q = require('q');

module.exports = function(options){
	var deferred = Q.defer();
	
	var requestOptions = {};
	if(!options.url){
		return Q.reject("URL missing");
	}
	requestOptions.url = options.url;
	if(options.method)
		requestOptions.method = options.method;
	if(options.headers)
		requestOptions.headers = options.headers;
	if(options.body)
		requestOptions.body = options.body;
	if(options.auth)
		requestOptions.auth = options.auth;
	if(options.proxy)
		requestOptions.proxy = options.proxy;
	if(options.timeout)
		requestOptions.timeout = options.timeout;
	
	request({
		url: options.url,
		proxy: options.proxy
	}, function(err, resp, body){
		if(err){
			return deferred.resolve(false);
		}
		if(options.status){
			if(resp.statusCode !== options.status){
				return deferred.resolve(false);
			}
		}
		if(options.result){
			if(body !== options.result){
				return deferred.resolve(false);
			}
		}
		if(options.regexp){
			if(options.regexp.test(body)){
				return deferred.resolve(false);
			}
		}
		deferred.resolve(true);
	});
	return deferred.promise;
};