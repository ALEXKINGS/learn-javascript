//require('babel-core/register')({
//  presets: ['stage-3']
//});
/*
const model = require('./model.js');

model.sync();

console.log('init db ok.');
*/
//process.exit(0);
const model = require('./model.js');
console.log("===============================");

let promise = new Promise(function(resolve,reject){
	console.log("promise");
	resolve(model.sync());
	
}).then(function(resolve){
	//process.exit(0)
	console.log("success"+resolve);
}).catch(function(reject){
	console.log("faild"+reject);
})


//model.sync().then( () => {
//	console.log("sync done db inited");
//	process.exit(0);
//}).catch( (e) => {
//	console.log(`failed:${e}`);
//	process.exit(0);
//});





