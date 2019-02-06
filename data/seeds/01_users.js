const { hashPass } = require('../../api/helpers/authHelpers');

// array of unhashed passwords, each index corresponds to guide object at same index in guides arr (guides[0].password = passArr[0])
// passwords are hashed/salted with bcrypt before being seeded for ease of use
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

const guides = [
	{
		id: 1,
		name: 'Stephannie Joskowitz',
		username: 'sjoskowitz0',
		age: 34,
		careerLength: '3 years'
	},
	{
		id: 2,
		name: 'Silvana McKendry',
		username: 'smckendry1',
		age: 50,
		careerLength: '9 months'
	},
	{
		id: 3,
		name: 'Maressa Schleswig-Holstein',
		username: 'mschleswigholstein2',
		age: 21,
		careerLength: '10 months'
	},
	{
		id: 4,
		name: 'Clem Wills',
		username: 'cwills3',
		age: 22,
		careerLength: '3 years'
	},
	{
		id: 5,
		name: 'Ingeborg Bultitude',
		username: 'ibultitude4',
		age: 43,
		careerLength: '3.75 years'
	},
	{
		id: 6,
		name: 'Mirna Hartgill',
		username: 'mhartgill5',
		age: 47,
		careerLength: '12 years'
	},
	{
		id: 7,
		name: 'Felicle Ward',
		username: 'fward6',
		age: 48,
		careerLength: '4.5 years'
	},
	{
		id: 8,
		name: 'Mair Whapples',
		username: 'mwhapples7',
		age: 30,
		careerLength: '6 years'
	},
	{
		id: 9,
		name: 'Angele Gewer',
		username: 'agewer8',
		age: 31,
		careerLength: '10.5 years'
	},
	{
		id: 10,
		name: 'Gilburt Keaton',
		username: 'gkeaton9',
		age: 21,
		careerLength: '8 months'
	}
];

const taglineDefault =
	'Aliquam nec pellentesque erat. Nam tristique et tellus quis rutrum. Suspendisse potenti. Mauris arcu neque, feugiat eu ex eu, dapibus dignissim augue. Integer nec augue velit. Donec sit amet neque cursus, tempus turpis vel, sodales libero.';

// hashed passwords and default tagline text are added to each guide object
const seededGuides = guides.map((guide, i) => {
	guide.password = hashPass(passArr[i], 14);
	guide.tagline = taglineDefault;
	return guide;
});

exports.seed = function(knex, Promise) {
	return knex('guides')
		.del()
		.then(function() {
			return knex('guides').insert(seededGuides);
		});
};

module.exports.guideSeed = seededGuides;
