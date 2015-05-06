var types = require('./types');

function Check(options){
	if(!options || !options.type){
		throw new Error("Check type is a required parameter");
	}
	this.type = options.type;
	var opts = this.options = {};
	for(var key in options){
		if(key !== 'type'){
			opts[key] = options[key];
		}
	}
	this._driver = types[this.type];
	if(!this._driver){
		throw new Error("Invalid check type: "+this.type);
	}
}

module.exports = Check;

Check.prototype.execute = function(callback){
	return this._driver(this.options).nodeify(callback);
};