const { decodeToken } = require('./helpers/authHelpers');
const Joi = require('joi');

const schema = Joi.object({
	description: Joi.string()
		.required()
		.trim(),
	title: Joi.string()
		.required()
		.trim(),
	duration: Joi.string().required(),
	type: Joi.string().required()
});

// module.exports = function (req, res, next) {
//   const { error: err } = schema.validate(req.body, { stripUnknown: true });

//   if (err) {
//     let error = new Error(err.details[0].message);
//     error.status = 400;
//     return next(error);
//   }

//   next();
// };

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
		const { error: err } = schema.validate(req.body, { stripUnknown: true });

		if (err) {
			let error = new Error(err.details[0].message);
			error.status = 400;
			return next(error);
		}

		next();
	},
	// hasCorrectKeys: function(req, res, next) {
	// 	const trip = req.body;

	// 	if (!trip.description || !trip.title || !trip.duration || !trip.type) {
	// 		return res
	// 			.status(404)
	// 			.json({ error: 'New trips must have title, description, type and duration' });
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
