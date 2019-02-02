exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('trips')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('trips').insert([
				{
					id: 1,
					title: 'Misery',
					description: 'China Mountain Ass-Kicking',
					img_url:
						'https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					type: 'Guansheng',
					guide_id: 10,
					duration: '10 days',
					designation: 'Private'
				},
				{
					id: 2,
					title: 'Horse Rebellion',
					description: 'Tough Russian Mountain Escape',
					img_url:
						'https://images.pexels.com/photos/1840102/pexels-photo-1840102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					type: 'Valuyki',
					guide_id: 6,
					duration: '2 days',
					designation: 'Professional'
				},
				{
					id: 3,
					title: 'Bloodline',
					description: 'Argentina Mountains are the Best',
					img_url:
						'https://images.pexels.com/photos/1840101/pexels-photo-1840101.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
					type: 'General Enrique Mosconi',
					guide_id: 2,
					duration: '11 days',
					designation: 'Private'
				},
				{
					id: 4,
					title: 'All Fall Down',
					description: 'Greece Mountain trip for a bit',
					img_url:
						'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
					type: 'Aianí',
					guide_id: 5,
					duration: '48 hrs',
					designation: 'Private'
				},
				{
					id: 5,
					title: 'Boy A',
					description: 'Sweden',
					img_url: 'http://dummyimage.com/212x139.png/5fa2dd/ffffff',
					type: 'Skellefteå',
					guide_id: 1,
					duration: '4 days',
					designation: 'Professional'
				},
				{
					id: 6,
					title: 'TerrorStorm: A History of Government-Sponsored Terrorism',
					description: 'Botswana',
					img_url: 'http://dummyimage.com/156x182.png/5fa2dd/ffffff',
					type: 'Tonota',
					guide_id: 3,
					duration: '1 week',
					designation: 'Professional'
				},
				{
					id: 7,
					title: 'Blue Spring (Aoi haru)',
					description: 'Argentina',
					img_url: 'http://dummyimage.com/161x115.png/cc0000/ffffff',
					type: 'El Galpón',
					guide_id: 8,
					duration: '2 days',
					designation: 'Professional'
				},
				{
					id: 8,
					title: 'Hotel',
					description: 'Ecuador',
					img_url: 'http://dummyimage.com/227x163.png/5fa2dd/ffffff',
					type: 'Huaquillas',
					guide_id: 1,
					duration: '36 hrs',
					designation: 'Professional'
				},
				{
					id: 9,
					title: 'Rage in Heaven',
					description: 'Philippines',
					img_url: 'http://dummyimage.com/208x191.png/ff4444/ffffff',
					type: 'Masaling',
					guide_id: 10,
					duration: 'one month',
					designation: 'Professional'
				},
				{
					id: 10,
					title: 'Soul Kitchen',
					description: 'Japan',
					img_url: 'http://dummyimage.com/186x222.png/5fa2dd/ffffff',
					type: 'Tokushima-shi',
					guide_id: 9,
					duration: '6 months',
					designation: 'Private'
				},
				{
					id: 11,
					title: 'Wavelength',
					description: 'Indonesia',
					img_url: 'http://dummyimage.com/195x202.png/dddddd/000000',
					type: 'Juhut',
					guide_id: 1,
					duration: '21 days',
					designation: 'Private'
				},
				{
					id: 12,
					title: 'Women Robbers (Diebinnen)',
					description: 'Russia',
					img_url: 'http://dummyimage.com/228x163.png/ff4444/ffffff',
					type: 'Rasshevatskaya',
					guide_id: 5,
					duration: '72 hrs',
					designation: 'Private'
				},
				{
					id: 13,
					title: 'Wanted: Dead or Alive',
					description: 'Macedonia',
					img_url: 'http://dummyimage.com/190x131.png/ff4444/ffffff',
					type: 'Pirava',
					guide_id: 1,
					duration: '24 hrs',
					designation: 'Private'
				},
				{
					id: 14,
					title: "Children's Hour, The",
					description: 'Ivory Coast',
					img_url: 'http://dummyimage.com/122x123.png/ff4444/ffffff',
					type: 'Adiaké',
					guide_id: 9,
					duration: '12 hrs',
					designation: 'Professional'
				},
				{
					id: 15,
					title: 'Drained (O cheiro do Ralo)',
					description: 'Russia',
					img_url: 'http://dummyimage.com/108x141.png/cc0000/ffffff',
					type: 'Shipunovo',
					guide_id: 7,
					duration: '196 hrs',
					designation: 'Private'
				},
				{
					id: 16,
					title: 'Drum',
					description: 'Philippines',
					img_url: 'http://dummyimage.com/120x123.png/5fa2dd/ffffff',
					type: 'Veruela',
					guide_id: 2,
					duration: '2 months',
					designation: 'Professional'
				},
				{
					id: 17,
					title: 'Seventh Horse of the Sun  (Suraj Ka Satvan Ghoda)',
					description: 'Argentina',
					img_url: 'http://dummyimage.com/208x143.png/cc0000/ffffff',
					type: 'Achiras',
					guide_id: 4,
					duration: '25 days',
					designation: 'Professional'
				},
				{
					id: 18,
					title: 'La vérité si je mens !',
					description: 'China',
					img_url: 'http://dummyimage.com/158x221.png/5fa2dd/ffffff',
					type: 'Baiyun',
					guide_id: 3,
					duration: '14 days',
					designation: 'Professional'
				},
				{
					id: 19,
					title: 'Pokémon the Movie: White - Victini and Zekrom',
					description: 'China',
					img_url: 'http://dummyimage.com/223x222.png/ff4444/ffffff',
					type: 'Zhangdu',
					guide_id: 6,
					duration: '120 hrs',
					designation: 'Professional'
				},
				{
					id: 20,
					title: 'Disaster L.A.',
					description: 'China',
					img_url: 'http://dummyimage.com/166x130.png/cc0000/ffffff',
					type: 'Duqu',
					guide_id: 9,
					duration: '45 days',
					designation: 'Professional'
				},
				{
					id: 21,
					title: 'Princesas',
					description: 'Netherlands',
					img_url: 'http://dummyimage.com/200x112.png/ff4444/ffffff',
					type: 'Schiedam postbusnummers',
					guide_id: 3,
					duration: '96 hrs',
					designation: 'Professional'
				},
				{
					id: 22,
					title: 'Crime and Punishment',
					description: 'Sweden',
					img_url: 'http://dummyimage.com/174x207.png/cc0000/ffffff',
					type: 'Gamleby',
					guide_id: 1,
					duration: '5 days',
					designation: 'Private'
				},
				{
					id: 23,
					title: 'Age of the Dragons',
					description: 'Thailand',
					img_url: 'http://dummyimage.com/196x196.png/ff4444/ffffff',
					type: 'Ban Talat Bueng',
					guide_id: 10,
					duration: '8 days',
					designation: 'Private'
				},
				{
					id: 24,
					title: "That's Entertainment, Part II",
					description: 'Guatemala',
					img_url: 'http://dummyimage.com/202x144.png/cc0000/ffffff',
					type: 'Cuyotenango',
					guide_id: 3,
					duration: '9 days',
					designation: 'Professional'
				},
				{
					id: 25,
					title: 'S.W.A.T.',
					description: 'Poland',
					img_url: 'http://dummyimage.com/156x132.png/5fa2dd/ffffff',
					type: 'Sędziejowice',
					guide_id: 2,
					duration: 202,
					designation: 'Private'
				},
				{
					id: 26,
					title: 'Jamilya',
					description: 'Greece',
					img_url: 'http://dummyimage.com/191x125.png/ff4444/ffffff',
					type: 'Rodópoli',
					guide_id: 6,
					duration: '100 days',
					designation: 'Professional'
				},
				{
					id: 27,
					title: 'Half Light',
					description: 'Ukraine',
					img_url: 'http://dummyimage.com/203x103.png/5fa2dd/ffffff',
					type: 'Mirovka',
					guide_id: 6,
					duration: '31 days',
					designation: 'Professional'
				},
				{
					id: 28,
					title: 'Voyager (Homo Faber)',
					description: 'Denmark',
					img_url: 'http://dummyimage.com/106x135.png/ff4444/ffffff',
					type: 'København',
					guide_id: 6,
					duration: '21 days',
					designation: 'Professional'
				},
				{
					id: 29,
					title: 'K-911',
					description: 'China',
					img_url: 'http://dummyimage.com/182x127.png/5fa2dd/ffffff',
					type: 'Pantian',
					guide_id: 1,
					duration: '9 days',
					designation: 'Private'
				},
				{
					id: 30,
					title: 'Valley of Decision, The',
					description: 'China',
					img_url: 'http://dummyimage.com/198x162.png/5fa2dd/ffffff',
					type: 'Guodu',
					guide_id: 1,
					duration: '4 days',
					designation: 'Private'
				},
				{
					id: 31,
					title: 'They Live',
					description: 'Chad',
					img_url: 'http://dummyimage.com/168x114.png/5fa2dd/ffffff',
					type: 'Mao',
					guide_id: 9,
					duration: '28 days',
					designation: 'Professional'
				},
				{
					id: 32,
					title: 'Quatermass 2 (Enemy from Space)',
					description: 'Macedonia',
					img_url: 'http://dummyimage.com/217x144.png/dddddd/000000',
					type: 'Bedinje',
					guide_id: 9,
					duration: '14 days',
					designation: 'Professional'
				},
				{
					id: 33,
					title: "Bill & Ted's Bogus Journey",
					description: 'Indonesia',
					img_url: 'http://dummyimage.com/103x206.png/5fa2dd/ffffff',
					type: 'Ajung',
					guide_id: 6,
					duration: '56 days',
					designation: 'Professional'
				},
				{
					id: 34,
					title: 'Crush, The',
					description: 'Brazil',
					img_url: 'http://dummyimage.com/172x165.png/dddddd/000000',
					type: 'Canindé',
					guide_id: 2,
					duration: '120 hrs',
					designation: 'Professional'
				},
				{
					id: 35,
					title: 'Last Hurrah for Chivalry (Hao xia)',
					description: 'United States',
					img_url: 'http://dummyimage.com/108x133.png/cc0000/ffffff',
					type: 'Erie',
					guide_id: 1,
					duration: '3.5 days',
					designation: 'Professional'
				},
				{
					id: 36,
					title: "Hell of a Day, A (Reines d'un jour)",
					description: 'China',
					img_url: 'http://dummyimage.com/197x109.png/cc0000/ffffff',
					type: 'Hengshui',
					guide_id: 6,
					duration: '4.5 days',
					designation: 'Private'
				},
				{
					id: 37,
					title: 'Ultramarines: A Warhammer 40,000 Movie',
					description: 'Poland',
					img_url: 'http://dummyimage.com/135x190.png/ff4444/ffffff',
					type: 'Polanica-Zdrój',
					guide_id: 3,
					duration: '9.5 days',
					designation: 'Professional'
				},
				{
					id: 38,
					title: 'Storage',
					description: 'France',
					img_url: 'http://dummyimage.com/228x174.png/cc0000/ffffff',
					type: 'Martigues',
					guide_id: 4,
					duration: '12 days',
					designation: 'Private'
				},
				{
					id: 39,
					title: 'Citizen Ruth',
					description: 'Philippines',
					img_url: 'http://dummyimage.com/102x206.png/dddddd/000000',
					type: 'Guagua',
					guide_id: 3,
					duration: '8 months',
					designation: 'Professional'
				},
				{
					id: 40,
					title: 'Afflicted, The',
					description: 'Israel',
					img_url: 'http://dummyimage.com/224x180.png/ff4444/ffffff',
					type: 'Metulla',
					guide_id: 9,
					duration: '1.5 days',
					designation: 'Professional'
				}
			]);
		});
};
