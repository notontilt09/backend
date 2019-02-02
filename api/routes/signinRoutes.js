const express = require('express');
const bcrypt = require('bcryptjs');

const { getUserById, register, generateToken, login } = require('../helpers');

const router = express.Router();

router.post('/register', async (req, res) => {
	const userInfo = req.body;
	userInfo.password = bcrypt.hashSync(userInfo.password, 14);
	try {
		const ids = await register(userInfo);
		const user = await getUserById(ids[0]);
		const token = generateToken(user);
		res.status(201).json({ token, id: user.id });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	const creds = req.body;
	try {
		const user = await login(creds);
		if (user && bcrypt.compareSync(creds.password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({ user, token });
		}
	} catch (err) {
		// console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
