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
