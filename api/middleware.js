const {
	auth: { decodeToken }
} = require('./helpers');

module.exports = {
	verifyAuth: function(req, res, next) {
		const token = req.headers.authorization;
		if (token) {
			decodeToken(token, (err, decodedToken) => {
				if (err) {
					res.status(401).json({ error: 'Invalid token' });
				} else {
					req.decodedToken = decodedToken;
					next();
				}
			});
		} else {
			res.status(401).json({ message: 'No token provided' });
		}
	},
	hasCorrectKeys: function(req, res, next) {
		const trip = req.body;

		if (!trip.description || !trip.title || !trip.duration || !trip.type) {
			return res
				.status(400)
				.json({ error: 'New trips must have title, description, type and duration' });
		} else {
			next();
		}
	},
	// hasAuthKeys: function(req, res, next) {
	// 	let user = req.body;
	// 	const { username, password, name } = user;
	// 	if (!(username && password && name)) {
	// 		return res.status(400).json({
	// 			error: 'Must have username and password fields to login. Plus name field to register'
	// 		});
	// 	} else {
	// 		next();
	// 	}
	// },
	checkDesignation: function(req, res, next) {
		if (req.body.designation) {
			const { designation } = req.body;

			if (!/private/i.test(designation) && !/professional/i.test(designation)) {
				return res
					.status(400)
					.json({ error: 'Trip designation must be either Professional or Private' });
			}

			req.body.designation = designation.charAt(0).toUpperCase() + designation.slice(1);
		}
		next();
	}
};
