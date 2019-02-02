const bcrypt = require('bcryptjs');

const passArr = [
	'850RKI7uKgC',
	'VKVUFwZzfA7J',
	'Ola4PcyaHq7f',
	'mnZuXokiM',
	'dC0BXc',
	'v7ZQWVqxil',
	'casSZgIYSQNX',
	'JWB0enaSz5',
	'ZB6M5Hk3',
	'rxzNHq'
];

const guideSeeds = [
	{
		id: 1,
		name: 'Stephannie Joskowitz',
		username: 'sjoskowitz0',
		age: 77
		// careerLength: 79,
		// password: password1
	},
	{
		id: 2,
		name: 'Silvana McKendry',
		username: 'smckendry1',
		age: 50
		// careerLength: 27,
		// password: password2
	},
	{
		id: 3,
		name: 'Maressa Schleswig-Holstein',
		username: 'mschleswigholstein2',
		age: 82,
		careerLength: 105
		// password: password3
	},
	{
		id: 4,
		name: 'Clem Wills',
		username: 'cwills3',
		age: 91,
		careerLength: 30
		// password: password4
	},
	{
		id: 5,
		name: 'Ingeborg Bultitude',
		username: 'ibultitude4',
		age: 13
		// careerLength: 71,
		// password: password5
	},
	{
		id: 6,
		name: 'Mirna Hartgill',
		username: 'mhartgill5',
		age: 6,
		careerLength: 23
		// password: password6
	},
	{
		id: 7,
		name: 'Felicle Ward',
		username: 'fward6',
		age: 77,
		careerLength: 41
		// password: password7
	},
	{
		id: 8,
		name: 'Mair Whapples',
		username: 'mwhapples7',
		age: 49,
		careerLength: 91
		// password: password8
	},
	{
		id: 9,
		name: 'Angele Gewer',
		username: 'agewer8',
		age: 62,
		careerLength: 111
		// password: password9
	},
	{
		id: 10,
		name: 'Gilburt Keaton',
		username: 'gkeaton9',
		age: 100,
		careerLength: 65
		// password: password10
	}
];

for (let i = 0; i < guideSeeds.length; i++) {
	guideSeeds[i].password = bcrypt.hashSync(passArr[i], 14);
	console.log(guideSeeds[i]);
}

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('guides')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('guides').insert(guideSeeds);
		});
};

// const password1 = bcrypt.hashSync('850RKI7uKgC', 14);
// const password2 = bcrypt.hashSync('VKVUFwZzfA7J', 14);
// const password3 = bcrypt.hashSync('Ola4PcyaHq7f', 14);
// const password4 = bcrypt.hashSync('mnZuXokiM', 14);
// const password5 = bcrypt.hashSync('dC0BXc', 14);
// const password6 = bcrypt.hashSync('v7ZQWVqxil', 14);
// const password7 = bcrypt.hashSync('casSZgIYSQNX', 14);
// const password8 = bcrypt.hashSync('JWB0enaSz5', 14);
// const password9 = bcrypt.hashSync('ZB6M5Hk3', 14);
// const password10 = bcrypt.hashSync('rxzNHq', 14);
