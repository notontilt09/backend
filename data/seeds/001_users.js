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
		age: 34
		// careerLength: 79,
	},
	{
		id: 2,
		name: 'Silvana McKendry',
		username: 'smckendry1',
		age: 50
	},
	{
		id: 3,
		name: 'Maressa Schleswig-Holstein',
		username: 'mschleswigholstein2',
		age: 21,
		careerLength: 105
	},
	{
		id: 4,
		name: 'Clem Wills',
		username: 'cwills3',
		age: 22,
		careerLength: 30
	},
	{
		id: 5,
		name: 'Ingeborg Bultitude',
		username: 'ibultitude4',
		age: 43
	},
	{
		id: 6,
		name: 'Mirna Hartgill',
		username: 'mhartgill5',
		age: 47,
		careerLength: 23
	},
	{
		id: 7,
		name: 'Felicle Ward',
		username: 'fward6',
		age: 48,
		careerLength: 41
	},
	{
		id: 8,
		name: 'Mair Whapples',
		username: 'mwhapples7',
		age: 30,
		careerLength: 91
	},
	{
		id: 9,
		name: 'Angele Gewer',
		username: 'agewer8',
		age: 31,
		careerLength: 111
	},
	{
		id: 10,
		name: 'Gilburt Keaton',
		username: 'gkeaton9',
		age: 29,
		careerLength: 65
	}
];

const taglineDefault =
	'Aliquam nec pellentesque erat. Nam tristique et tellus quis rutrum. Suspendisse potenti. Mauris arcu neque, feugiat eu ex eu, dapibus dignissim augue. Integer nec augue velit. Donec sit amet neque cursus, tempus turpis vel, sodales libero. Cras id vestibulum velit. Etiam pulvinar commodo ultricies. Quisque quis eros a purus sollicitudin pharetra sit amet ut lectus. Vivamus est sem, finibus non pulvinar sit amet, rutrum sed urna. Mauris viverra ex et dui maximus, at dignissim elit.';

for (let i = 0; i < guideSeeds.length; i++) {
	guideSeeds[i].password = bcrypt.hashSync(passArr[i], 14);
	guideSeeds[i].tagline = taglineDefault;
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
// c = bcrypt.hashSync('rxzNHq', 14);
