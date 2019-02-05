const express = require('express');
const bcrypt = require('bcryptjs');
const { register, login, generateToken, hashPass } = require('../helpers/authHelpers');
const { getUserById } = require('../helpers/guideHelpers');

const router = express.Router();

router.post('/register', async (req, res, next) => {
	let { password } = req.body;
	req.body.password = hashPass(password, 14);

	try {
		const ids = await register(req.body);
		const user = await getUserById(ids[0]);
		const token = generateToken(user);
		res.status(201).json({ token, id: ids[0] });
	} catch (err) {
		next({ message: err }, res);
	}
});

router.post('/login', async (req, res, next) => {
	const creds = req.body;
	try {
		const user = await login(creds);
		if (!user) next({ status: 404, message: 'A user with those credentials does not exist' }, res);

		if (user && bcrypt.compareSync(creds.password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({ token, id: user.id });
		}
	} catch (err) {
		next({ message: 'Fill in both username and password please' }, res);
		// res.status(500).json({ error: 'Fill in both username and password please' });
	}
});

module.exports = router;
