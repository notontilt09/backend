const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ error: 'Invalid token' });
			} else {
				req.decodedToken = decodedToken;
				// console.log(decodedToken, req.body);
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'No token provided' });
	}
};

module.exports = {
	auth: function(req, res, next) {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, secret, (err, decodedToken) => {
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
	checkDesignation: function(req, res, next) {
		if (req.body.designation) {
			const { designation } = req.body;
			// console.log('hey', designation);
			// console.log(!/private/i.test(designation) && !/professional/i.test(designation));

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
