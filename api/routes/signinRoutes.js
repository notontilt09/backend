const express = require('express');
const bcrypt = require('bcryptjs');
const { register, login, generateToken, hashPass } = require('../helpers/authHelpers');
const { getUserById } = require('../helpers/guideHelpers');
const { register } = require('../middleware');

const router = express.Router();

router.post('/register', register, async (req, res, next) => {
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
		if (user && bcrypt.compareSync(creds.password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({ token, id: user.id });
		} else {
			next({ status: 404, message: 'Check that username and password are both correct' });
		}
	} catch (err) {
		next({ message: 'Fill in both username and password please' }, res);
	}
});

module.exports = router;
