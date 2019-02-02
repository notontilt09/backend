const express = require('express');
const bcrypt = require('bcryptjs');

const { getTripsByUser } = require('../helpers');

const router = express.Router();

router.get('/:id/trips', async (req, res) => {
	const { id } = req.params;
	try {
		const trips = await getTripsByUser(id);
		console.log(trips);
		if (!trips) {
			res.status(404).json({ error: 'A guide with that ID does not exist' });
		} else {
			res.status(200).json(trips);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
