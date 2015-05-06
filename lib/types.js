var fs = require('fs');

var checksPath = __dirname+'/../checks/';

fs.readdirSync(checksPath).forEach(function(file){
	if(file.substr(-3) === '.js'){
		var type = file.substr(0, file.length-3);
		exports[type] = require(checksPath + type);
	}
});