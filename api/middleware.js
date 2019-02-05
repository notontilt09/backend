const { decodeToken } = require('./helpers/authHelpers');
const Joi = require('joi');

const tripSchema = Joi.object({
	description: Joi.string()
		.required()
		.trim(),
	title: Joi.string()
		.required()
		.trim(),
	duration: Joi.string().required(),
	type: Joi.string().required()
});

const registerSchema = Joi.object({
	username: Joi.string()
		.required()
		.trim(),
	password: Joi.string()
		.required()
		.trim(),
	name: Joi.string()
		.required()
		.trim(),
	tagline: Joi.string()
		.optional()
		.trim(),
	careerLength: Joi.string()
		.optional()
		.trim(),
	age: Joi.number().optional()
});

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
		const { error: err } = tripSchema.validate(req.body, { stripUnknown: true });
		if (err) {
			let error = new Error(err.details[0].message);
			error.status = 400;
			return next(error);
		}
		next();
	},
	registerCheck: function(req, res, next) {
		const { error: err } = registerSchema.validate(req.body, { stripUnknown: true });
		if (err) {
			let error = new Error(err.details[0].message);
			error.status = 400;
			return next(error);
		}
		next();
	},
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
