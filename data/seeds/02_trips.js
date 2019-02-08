const trips = [
	{
		id: 1,
		title: 'Misery',
		description: 'China Mountain Ass-Kicking',
		type: 'Guansheng',
		guide_id: 10,
		duration: 192,
		designation: 'Private'
	},
	{
		id: 2,
		title: 'Horse Rebellion',
		description: 'Tough Russian Mountain Escape',
		type: 'Valuyki',
		guide_id: 6,
		duration: 48,
		designation: 'Professional'
	},
	{
		id: 3,
		title: 'Bloodline',
		description: 'Argentina Mountains are the Best',
		type: 'General Enrique Mosconi',
		guide_id: 2,
		duration: 36,
		designation: 'Private'
	},
	{
		id: 4,
		title: 'All Fall Down',
		description: 'Greece Mountain trip for a bit',
		type: 'Aianí',
		guide_id: 5,
		duration: 48,
		designation: 'Private'
	},
	{
		id: 5,
		title: 'Boy A',
		description: 'Sweden',
		type: 'Skellefteå',
		guide_id: 1,
		duration: 168,
		designation: 'Professional'
	},
	{
		id: 6,
		title: 'TerrorStorm: A History of Government-Sponsored Terrorism',
		description: 'Botswana',
		type: 'Tonota',
		guide_id: 3,
		duration: 144,
		designation: 'Professional'
	},
	{
		id: 7,
		title: 'Blue Spring (Aoi haru)',
		description: 'Argentina',
		type: 'El Galpón',
		guide_id: 8,
		duration: 38,
		designation: 'Professional'
	},
	{
		id: 8,
		title: 'Hotel',
		description: 'Ecuador',
		type: 'Huaquillas',
		guide_id: 1,
		duration: 36,
		designation: 'Professional'
	},
	{
		id: 9,
		title: 'Rage in Heaven',
		description: 'Philippines',
		type: 'Masaling',
		guide_id: 10,
		duration: 148,
		designation: 'Professional'
	},
	{
		id: 10,
		title: 'Soul Kitchen',
		description: 'Japan',
		type: 'Tokushima-shi',
		guide_id: 9,
		duration: 132,
		designation: 'Private'
	},
	{
		id: 11,
		title: 'Wavelength',
		description: 'Indonesia',
		type: 'Juhut',
		guide_id: 1,
		duration: 120,
		designation: 'Private'
	},
	{
		id: 12,
		title: 'Women Robbers (Diebinnen)',
		description: 'Russia',
		type: 'Rasshevatskaya',
		guide_id: 5,
		duration: 72,
		designation: 'Private'
	},
	{
		id: 13,
		title: 'Wanted: Dead or Alive',
		description: 'Macedonia',
		type: 'Pirava',
		guide_id: 1,
		duration: 24,
		designation: 'Private'
	},
	{
		id: 14,
		title: "Children's Hour, The",
		description: 'Ivory Coast',
		type: 'Adiaké',
		guide_id: 9,
		duration: 12,
		designation: 'Professional'
	},
	{
		id: 15,
		title: 'Drained (O cheiro do Ralo)',
		description: 'Russia',
		type: 'Shipunovo',
		guide_id: 7,
		duration: 196,
		designation: 'Private'
	},
	{
		id: 16,
		title: 'Drum',
		description: 'Philippines',
		type: 'Veruela',
		guide_id: 2,
		duration: 108,
		designation: 'Professional'
	},
	{
		id: 17,
		title: 'Seventh Horse of the Sun  (Suraj Ka Satvan Ghoda)',
		description: 'Argentina',
		type: 'Achiras',
		guide_id: 4,
		duration: 96,
		designation: 'Professional'
	},
	{
		id: 18,
		title: 'La vérité si je mens !',
		description: 'China',
		type: 'Baiyun',
		guide_id: 3,
		duration: 140,
		designation: 'Professional'
	},
	{
		id: 19,
		title: 'Pokémon the Movie: White - Victini and Zekrom',
		description: 'China',
		type: 'Zhangdu',
		guide_id: 6,
		duration: 120,
		designation: 'Professional'
	},
	{
		id: 20,
		title: 'Disaster L.A.',
		description: 'China',
		type: 'Duqu',
		guide_id: 9,
		duration: 48,
		designation: 'Professional'
	},
	{
		id: 21,
		title: 'Princesas',
		description: 'Netherlands',
		type: 'Schiedam postbusnummers',
		guide_id: 3,
		duration: 60,
		designation: 'Professional'
	},
	{
		id: 22,
		title: 'Crime and Punishment',
		description: 'Sweden',
		type: 'Gamleby',
		guide_id: 1,
		duration: 84,
		designation: 'Private'
	},
	{
		id: 23,
		title: 'Age of the Dragons',
		description: 'Thailand',
		type: 'Ban Talat Bueng',
		guide_id: 10,
		duration: 80,
		designation: 'Private'
	},
	{
		id: 24,
		title: 'Soggy Bottom Boys',
		description: 'Guatemala',
		type: 'Cuyotenango',
		guide_id: 3,
		duration: 100,
		designation: 'Professional'
	},
	{
		id: 25,
		title: 'S.W.A.T.',
		description: 'Poland',
		type: 'Sędziejowice',
		guide_id: 2,
		duration: 202,
		designation: 'Private'
	},
	{
		id: 26,
		title: 'Jamilya',
		description: 'Greece',
		type: 'Rodópoli',
		guide_id: 6,
		duration: 91,
		designation: 'Professional'
	},
	{
		id: 27,
		title: 'Half Light',
		description: 'Ukraine',
		type: 'Mirovka',
		guide_id: 6,
		duration: 20,
		designation: 'Professional'
	},
	{
		id: 28,
		title: 'Voyager (Homo Faber)',
		description: 'Denmark',
		type: 'København',
		guide_id: 6,
		duration: 34,
		designation: 'Professional'
	},
	{
		id: 29,
		title: 'Brap Life',
		description: 'China',
		type: 'Pantian',
		guide_id: 1,
		duration: 10000,
		designation: 'Private'
	},
	{
		id: 30,
		title: 'Get Rich or Die Tryin',
		description: 'China',
		type: 'Guodu',
		guide_id: 1,
		duration: 1000,
		designation: 'Private'
	},
	{
		id: 31,
		title: 'They Live',
		description: 'Chad',
		type: 'Mao',
		guide_id: 9,
		duration: 100,
		designation: 'Professional'
	},
	{
		id: 32,
		title: 'Quatermass 2 (Enemy from Space)',
		description: 'Macedonia',
		type: 'Bedinje',
		guide_id: 9,
		duration: 256,
		designation: 'Professional'
	},
	{
		id: 33,
		title: "Bill & Ted's Bogus Journey",
		description: 'Indonesia',
		type: 'Ajung',
		guide_id: 6,
		duration: 164,
		designation: 'Professional'
	},
	{
		id: 34,
		title: 'Crush, The',
		description: 'Brazil',
		type: 'Canindé',
		guide_id: 2,
		duration: 72,
		designation: 'Professional'
	},
	{
		id: 35,
		title: 'Last Hurrah for Chivalry (Hao xia)',
		description: 'United States',
		type: 'Erie',
		guide_id: 1,
		duration: 48,
		designation: 'Professional'
	},
	{
		id: 36,
		title: "Hell of a Day, A (Reines d'un jour)",
		description: 'China',
		type: 'Hengshui',
		guide_id: 6,
		duration: 96,
		designation: 'Private'
	},
	{
		id: 37,
		title: 'Ultramarines: A Warhammer 40,000 Movie',
		description: 'Poland',
		type: 'Polanica-Zdrój',
		guide_id: 3,
		duration: 200,
		designation: 'Professional'
	},
	{
		id: 38,
		title: 'Storage',
		description: 'France',
		type: 'Martigues',
		guide_id: 4,
		duration: 128,
		designation: 'Private'
	},
	{
		id: 39,
		title: 'Citizen Ruth',
		description: 'Philippines',
		type: 'Guagua',
		guide_id: 3,
		duration: 96,
		designation: 'Professional'
	},
	{
		id: 40,
		title: 'Afflicted, The',
		description: 'Israel',
		type: 'Metulla',
		guide_id: 9,
		duration: 48,
		designation: 'Professional'
	}
];

const seedTrips = trips.map(trip => {
	trip.img_url =
		'https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
	return trip;
});

exports.seed = function(knex, Promise) {
	return knex('trips')
		.del()
		.then(function() {
			return knex('trips').insert(seedTrips);
		});
};

module.exports.tripSeed = seedTrips;
