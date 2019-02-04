const express = require('express');
const bcrypt = require('bcryptjs');

const {
	user: { getUserById, getUsers },
	auth: { register, login, generateToken, hashPass }
} = require('../helpers');

const router = express.Router();

router.post('/register', async (req, res) => {
	let { password } = req.body;
	password = hashPass(password, 14);

	try {
		const ids = await register(req.body);
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
		if (!user) return res.status(404).json({ err: 'A user with those credentials does not exist' });

		if (user && bcrypt.compareSync(creds.password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({ user, token });
		}
	} catch (err) {
		res.status(500).json({ error: 'Fill in both username and password please' });
	}
});

//TEST ROUTE

router.get('/', async (req, res) => {
	const users = await getUsers();
	res.status(200).json(users);
});

module.exports = router;
