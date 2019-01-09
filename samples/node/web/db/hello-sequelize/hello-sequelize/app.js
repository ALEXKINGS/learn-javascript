const Sequelize = require("sequelize");
const config = require('./config');

var sequelize = new Sequelize(config.database,config.username,config.password,{
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

var Pet = sequelize.define('pet', {
	id: {
		type: Sequelize.STRING(50),
		primaryKey: true
	},
	name: Sequelize.STRING(100),
	gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{
	timestamps: false
});

var now = Date.now();

Pet.create({
	id: "c-"+now,
	name: "Cat",
	gender: false,
	birth:"2019-01-01",
	createdAt:now,
	updatedAt:now,
	version:"0"
}).then(function(p){
	console.log("created."+JSON.stringify(p));
}).catch(function(e){
	console.log("failed:"+e);
});

(async () => {
	var dog = await Pet.create({
		id: "d-"+now,
		name: 'Dog',
        gender: false,
        birth: '2019-01-01',
        createdAt: now,
        updatedAt: now,
        version: 0
	});
	console.log('created:'+JSON.stringify(dog));
})();

(async () => {
	var pets = await Pet.findAll({
		where: {
			name:"Dog"
		}
	});
	console.log(`find ${pets.length} pets:`);
	for(let p of pets){
		console.log(JSON.stringify(p));
	}
})();

(async () => {
	var p = await queryFromSomewhere();
	await p.destroy();
})();


































